import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Download, Printer, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const VerFactura: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { facturas, cambiarEstadoFactura } = useData();
  
  const factura = facturas.find(f => f.id === id);
  
  if (!factura) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Factura no encontrada</h2>
        <p className="text-gray-600 mb-4">La factura que estás buscando no existe o ha sido eliminada.</p>
        <Link
          to="/facturas"
          className="inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a facturas
        </Link>
      </div>
    );
  }
  
  const handleCambiarEstado = (estado: 'pendiente' | 'pagada' | 'cancelada') => {
    cambiarEstadoFactura(factura.id, estado);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button
          onClick={() => navigate('/facturas')}
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a facturas
        </button>
        
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/facturas/${factura.id}/editar`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Link>
          
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4 mr-2" />
            Descargar PDF
          </button>
          
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Factura #{factura.numero}</h1>
                  <p className="text-sm text-gray-500">Fecha de emisión: {factura.fecha}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  factura.estado === 'pagada'
                    ? 'bg-green-100 text-green-800'
                    : factura.estado === 'pendiente'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                }`}>
                  {factura.estado.charAt(0).toUpperCase() + factura.estado.slice(1)}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Datos de la Empresa</h3>
                  <p className="text-sm font-medium text-gray-900">FacturaPro SL</p>
                  <p className="text-sm text-gray-600">Calle Ejemplo 123</p>
                  <p className="text-sm text-gray-600">28001 Madrid, España</p>
                  <p className="text-sm text-gray-600">CIF: B12345678</p>
                  <p className="text-sm text-gray-600">Email: contacto@facturapro.com</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Cliente</h3>
                  <p className="text-sm font-medium text-gray-900">{factura.cliente.nombre}</p>
                  <p className="text-sm text-gray-600">{factura.cliente.direccion}</p>
                  <p className="text-sm text-gray-600">{factura.cliente.ciudad}, {factura.cliente.pais}</p>
                  <p className="text-sm text-gray-600">CIF/NIF: {factura.cliente.nif}</p>
                  <p className="text-sm text-gray-600">Email: {factura.cliente.email}</p>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unit.</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {factura.detalles.map((detalle) => (
                      <tr key={detalle.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {detalle.producto.nombre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          ${detalle.precioUnitario.toLocaleString('es-ES')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {detalle.cantidad}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-right">
                          ${detalle.subtotal.toLocaleString('es-ES')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-500">Subtotal</td>
                      <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">${factura.subtotal.toLocaleString('es-ES')}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-500">IVA (16%)</td>
                      <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">${factura.iva.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td colSpan={3} className="px-6 py-3 text-right text-base font-medium text-gray-900">Total</td>
                      <td className="px-6 py-3 text-right text-base font-bold text-blue-600">${factura.total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Notas</h3>
                <p className="text-sm text-gray-600">
                  Gracias por confiar en nosotros. El pago debe realizarse en un plazo de 30 días a partir de la fecha de emisión de la factura.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Estado de la Factura</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <button
                onClick={() => handleCambiarEstado('pendiente')}
                className={`flex items-center w-full p-3 rounded-md ${
                  factura.estado === 'pendiente'
                    ? 'bg-yellow-50 border border-yellow-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <Clock className={`h-5 w-5 mr-3 ${
                  factura.estado === 'pendiente' ? 'text-yellow-500' : 'text-gray-400'
                }`} />
                <div className="flex-1 text-left">
                  <p className={`text-sm font-medium ${
                    factura.estado === 'pendiente' ? 'text-yellow-800' : 'text-gray-700'
                  }`}>
                    Pendiente
                  </p>
                  <p className="text-xs text-gray-500">La factura ha sido emitida pero está pendiente de pago</p>
                </div>
              </button>
              
              <button
                onClick={() => handleCambiarEstado('pagada')}
                className={`flex items-center w-full p-3 rounded-md ${
                  factura.estado === 'pagada'
                    ? 'bg-green-50 border border-green-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <CheckCircle className={`h-5 w-5 mr-3 ${
                  factura.estado === 'pagada' ? 'text-green-500' : 'text-gray-400'
                }`} />
                <div className="flex-1 text-left">
                  <p className={`text-sm font-medium ${
                    factura.estado === 'pagada' ? 'text-green-800' : 'text-gray-700'
                  }`}>
                    Pagada
                  </p>
                  <p className="text-xs text-gray-500">La factura ha sido pagada por el cliente</p>
                </div>
              </button>
              
              <button
                onClick={() => handleCambiarEstado('cancelada')}
                className={`flex items-center w-full p-3 rounded-md ${
                  factura.estado === 'cancelada'
                    ? 'bg-red-50 border border-red-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <XCircle className={`h-5 w-5 mr-3 ${
                  factura.estado === 'cancelada' ? 'text-red-500' : 'text-gray-400'
                }`} />
                <div className="flex-1 text-left">
                  <p className={`text-sm font-medium ${
                    factura.estado === 'cancelada' ? 'text-red-800' : 'text-gray-700'
                  }`}>
                    Cancelada
                  </p>
                  <p className="text-xs text-gray-500">La factura ha sido cancelada o anulada</p>
                </div>
              </button>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Historial de Cambios</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Factura creada</p>
                    <p className="text-xs text-gray-500">{new Date(factura.fechaCreacion).toLocaleString('es-ES')}</p>
                  </div>
                </div>
                
                {/* Aquí se mostrarían más eventos si los tuviéramos */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerFactura;