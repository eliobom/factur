export interface Producto {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precioCompra: number;
  precioVenta: number;
  stock: number;
  stockMinimo: number;
  ubicacion: string;
  estado: 'activo' | 'inactivo' | 'descontinuado';
  fechaIngreso: string;
  fechaActualizacion: string;
}

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface MovimientoInventario {
  id: string;
  productoId: string;
  tipo: 'entrada' | 'salida';
  cantidad: number;
  fecha: string;
  motivo: string;
  usuario: string;
}

export interface Cliente {
  id: string;
  nombre: string;
  documento: string;
  email: string;
  telefono: string;
  direccion: string;
}

export interface DetalleVenta {
  id: string;
  productoId: string;
  producto: Producto;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
  subtotal: number;
}

export interface Venta {
  id: string;
  numero: string;
  fecha: string;
  clienteId: string;
  cliente: Cliente;
  detalles: DetalleVenta[];
  subtotal: number;
  descuento: number;
  impuesto: number;
  total: number;
  formaPago: 'efectivo' | 'tarjeta' | 'transferencia';
  estado: 'pendiente' | 'completada' | 'anulada';
}

export interface EstadisticasVentas {
  totalVentas: number;
  ventasPorPeriodo: {
    periodo: string;
    total: number;
  }[];
  productosPopulares: {
    producto: string;
    cantidad: number;
    total: number;
  }[];
}

export interface EstadisticasInventario {
  totalProductos: number;
  valorInventario: number;
  stockBajo: number;
  rotacionPromedio: number;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'vendedor' | 'bodeguero';
}

export interface Configuracion {
  nombreNegocio: string;
  rut: string;
  direccion: string;
  telefono: string;
  email: string;
  logoUrl: string;
  impuesto: number;
  stockMinimoGlobal: number;
}