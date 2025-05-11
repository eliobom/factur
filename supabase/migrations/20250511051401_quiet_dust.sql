/*
  # Esquema inicial del sistema de gestión

  1. Nuevas Tablas
    - productos: Almacena información de productos
    - categorias: Categorías de productos
    - movimientos_inventario: Registro de entradas y salidas
    - clientes: Información de clientes
    - ventas: Registro de ventas
    - detalles_venta: Líneas de productos en ventas
    - usuarios: Usuarios del sistema
    - configuracion: Configuración global

  2. Seguridad
    - Políticas RLS para cada tabla
    - Roles de usuario definidos
*/

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "unaccent";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Crear enum types
CREATE TYPE estado_producto AS ENUM ('activo', 'inactivo', 'descontinuado');
CREATE TYPE tipo_movimiento AS ENUM ('entrada', 'salida');
CREATE TYPE forma_pago AS ENUM ('efectivo', 'tarjeta', 'transferencia');
CREATE TYPE estado_venta AS ENUM ('pendiente', 'completada', 'anulada');
CREATE TYPE rol_usuario AS ENUM ('admin', 'vendedor', 'bodeguero');

-- Tabla de productos
CREATE TABLE productos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo text UNIQUE NOT NULL,
  nombre text NOT NULL,
  descripcion text,
  categoria_id uuid NOT NULL,
  precio_compra decimal(10,2) NOT NULL,
  precio_venta decimal(10,2) NOT NULL,
  stock integer NOT NULL DEFAULT 0,
  stock_minimo integer NOT NULL DEFAULT 5,
  ubicacion text,
  estado estado_producto NOT NULL DEFAULT 'activo',
  fecha_ingreso timestamptz NOT NULL DEFAULT now(),
  fecha_actualizacion timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabla de categorías
CREATE TABLE categorias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL UNIQUE,
  descripcion text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabla de movimientos de inventario
CREATE TABLE movimientos_inventario (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  producto_id uuid NOT NULL REFERENCES productos(id),
  tipo tipo_movimiento NOT NULL,
  cantidad integer NOT NULL,
  fecha timestamptz NOT NULL DEFAULT now(),
  motivo text NOT NULL,
  usuario_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Tabla de clientes
CREATE TABLE clientes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  documento text UNIQUE,
  email text,
  telefono text,
  direccion text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabla de ventas
CREATE TABLE ventas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  numero text UNIQUE NOT NULL,
  fecha timestamptz NOT NULL DEFAULT now(),
  cliente_id uuid REFERENCES clientes(id),
  subtotal decimal(10,2) NOT NULL,
  descuento decimal(10,2) NOT NULL DEFAULT 0,
  impuesto decimal(10,2) NOT NULL DEFAULT 0,
  total decimal(10,2) NOT NULL,
  forma_pago forma_pago NOT NULL,
  estado estado_venta NOT NULL DEFAULT 'pendiente',
  usuario_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabla de detalles de venta
CREATE TABLE detalles_venta (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venta_id uuid NOT NULL REFERENCES ventas(id),
  producto_id uuid NOT NULL REFERENCES productos(id),
  cantidad integer NOT NULL,
  precio_unitario decimal(10,2) NOT NULL,
  descuento decimal(10,2) NOT NULL DEFAULT 0,
  subtotal decimal(10,2) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Tabla de configuración
CREATE TABLE configuracion (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre_negocio text NOT NULL,
  rut text NOT NULL,
  direccion text,
  telefono text,
  email text,
  logo_url text,
  impuesto decimal(5,2) NOT NULL DEFAULT 19,
  stock_minimo_global integer NOT NULL DEFAULT 5,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Índices para búsqueda
CREATE INDEX idx_productos_nombre ON productos USING gin (nombre gin_trgm_ops);
CREATE INDEX idx_productos_codigo ON productos USING gin (codigo gin_trgm_ops);
CREATE INDEX idx_productos_categoria ON productos(categoria_id);
CREATE INDEX idx_productos_estado ON productos(estado);
CREATE INDEX idx_ventas_fecha ON ventas(fecha);
CREATE INDEX idx_ventas_cliente ON ventas(cliente_id);
CREATE INDEX idx_movimientos_fecha ON movimientos_inventario(fecha);
CREATE INDEX idx_movimientos_producto ON movimientos_inventario(producto_id);

-- Habilitar Row Level Security
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE movimientos_inventario ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ventas ENABLE ROW LEVEL SECURITY;
ALTER TABLE detalles_venta ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Acceso público a productos activos"
  ON productos
  FOR SELECT
  TO authenticated
  USING (estado = 'activo');

CREATE POLICY "Administradores pueden gestionar productos"
  ON productos
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Función para actualizar timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar timestamps
CREATE TRIGGER update_productos_timestamp
  BEFORE UPDATE ON productos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_categorias_timestamp
  BEFORE UPDATE ON categorias
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_clientes_timestamp
  BEFORE UPDATE ON clientes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_ventas_timestamp
  BEFORE UPDATE ON ventas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_configuracion_timestamp
  BEFORE UPDATE ON configuracion
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Función para actualizar stock
CREATE OR REPLACE FUNCTION actualizar_stock()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.tipo = 'entrada' THEN
      UPDATE productos
      SET stock = stock + NEW.cantidad
      WHERE id = NEW.producto_id;
    ELSE
      UPDATE productos
      SET stock = stock - NEW.cantidad
      WHERE id = NEW.producto_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar stock automáticamente
CREATE TRIGGER trigger_actualizar_stock
  AFTER INSERT ON movimientos_inventario
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_stock();