import { Cliente, Producto, Factura, Configuracion } from '../types';

// Datos para demostración
const clientes: Cliente[] = [
  {
    id: '1',
    nombre: 'Empresa Innovadora S.L.',
    email: 'contacto@empresainnovadora.com',
    telefono: '912345678',
    nif: 'B12345678',
    direccion: 'Calle Gran Vía 123',
    ciudad: 'Madrid',
    codigoPostal: '28001',
    pais: 'España',
    notas: 'Cliente importante, ofrecer descuentos en próximas compras.'
  },
  {
    id: '2',
    nombre: 'Comercial del Sur S.A.',
    email: 'info@comercialdelsur.com',
    telefono: '954123456',
    nif: 'A87654321',
    direccion: 'Avenida de la Constitución 45',
    ciudad: 'Sevilla',
    codigoPostal: '41001',
    pais: 'España',
    notas: ''
  },
  {
    id: '3',
    nombre: 'Tecnología Avanzada SL',
    email: 'contacto@tecnologiaavanzada.com',
    telefono: '932223344',
    nif: 'B98765432',
    direccion: 'Paseo de Gracia 78',
    ciudad: 'Barcelona',
    codigoPostal: '08008',
    pais: 'España',
    notas: 'Interesados en servicios de desarrollo web.'
  }
];

const productos: Producto[] = [
  {
    id: '1',
    nombre: 'Diseño Web Profesional',
    codigo: 'DWP-001',
    descripcion: 'Diseño completo de sitio web responsive con hasta 5 páginas',
    precio: 1500,
    impuesto: 16
  },
  {
    id: '2',
    nombre: 'Desarrollo de Aplicación Móvil',
    codigo: 'DAM-002',
    descripcion: 'Desarrollo de aplicación para iOS y Android',
    precio: 3000,
    impuesto: 16
  },
  {
    id: '3',
    nombre: 'Consultoría SEO',
    codigo: 'SEO-003',
    descripcion: 'Análisis completo y optimización SEO de sitio web',
    precio: 750,
    impuesto: 16
  },
  {
    id: '4',
    nombre: 'Mantenimiento Web Mensual',
    codigo: 'MWM-004',
    descripcion: 'Servicio mensual de mantenimiento y actualización web',
    precio: 300,
    impuesto: 16
  }
];

const facturas: Factura[] = [
  {
    id: '1',
    numero: 'FAC-20250110-001',
    fecha: '2025-01-10',
    clienteId: '1',
    cliente: clientes[0],
    detalles: [
      {
        id: '1',
        productoId: '1',
        producto: productos[0],
        cantidad: 1,
        precioUnitario: 1500,
        subtotal: 1500
      },
      {
        id: '2',
        productoId: '3',
        producto: productos[2],
        cantidad: 1,
        precioUnitario: 750,
        subtotal: 750
      }
    ],
    subtotal: 2250,
    iva: 360,
    total: 2610,
    estado: 'pagada',
    fechaCreacion: '2025-01-10T10:30:00.000Z'
  },
  {
    id: '2',
    numero: 'FAC-20250115-002',
    fecha: '2025-01-15',
    clienteId: '2',
    cliente: clientes[1],
    detalles: [
      {
        id: '1',
        productoId: '2',
        producto: productos[1],
        cantidad: 1,
        precioUnitario: 3000,
        subtotal: 3000
      }
    ],
    subtotal: 3000,
    iva: 480,
    total: 3480,
    estado: 'pendiente',
    fechaCreacion: '2025-01-15T14:20:00.000Z'
  },
  {
    id: '3',
    numero: 'FAC-20250120-003',
    fecha: '2025-01-20',
    clienteId: '3',
    cliente: clientes[2],
    detalles: [
      {
        id: '1',
        productoId: '1',
        producto: productos[0],
        cantidad: 1,
        precioUnitario: 1500,
        subtotal: 1500
      },
      {
        id: '2',
        productoId: '4',
        producto: productos[3],
        cantidad: 3,
        precioUnitario: 300,
        subtotal: 900
      }
    ],
    subtotal: 2400,
    iva: 384,
    total: 2784,
    estado: 'pendiente',
    fechaCreacion: '2025-01-20T09:15:00.000Z'
  }
];

const configuracion: Configuracion = {
  nombreEmpresa: 'FacturaPro S.L.',
  nif: 'B12345678',
  direccion: 'Calle Ejemplo 123',
  codigoPostal: '28001',
  ciudad: 'Madrid',
  pais: 'España',
  telefono: '910000000',
  email: 'contacto@facturapro.com',
  sitioWeb: 'www.facturapro.com',
  moneda: 'EUR',
  impuesto: 16,
  logoUrl: 'https://via.placeholder.com/150x50?text=FacturaPro'
};

export default {
  clientes,
  productos,
  facturas,
  configuracion
};