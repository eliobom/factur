import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, ArrowLeft, Save } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Factura, DetalleFactura } from '../types';

const NuevaFactura: React.FC = () => {
  const navigate = useNavigate();
  const { clientes, productos, crearFactura } = useData();
  
  const [clienteId, setClienteId] = useState('');
  const [fecha, setFecha] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  const [detalles, setDetalles] = useState<DetalleFactura[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [total, setTotal] = useState(0);
  
  // Agregar detalle a la factura
  const agregarDetalle = () => {
    if (productos.length === 0) return;
    
    const nuevoDetalle: DetalleFactura = {
      id: Date.now().toString(),
      productoId: productos[0].id,
      producto: productos[0],
      cantidad: 1,
      precioUnitario: productos[0].precio,
      subtotal: productos[0].precio
    };
    
    setDetalles([...detalles, nuevoDetalle]);
    recalcularTotales([...detalles, nuevoDetalle]);
  };
  
  // Eliminar detalle de la factura
  const eliminarDetalle = (id: string) => {
    const nuevosDetalles = detalles.filter(d => d.id !== id);
    setDetalles(nuevosDetalles);
    recalcularTotales(nuevosDetalles);
  };
  
  // Actualizar cantidad de un detalle
  const actualizarCantidad = (id: string, cantidad: number) => {
    if (cantidad < 1) return;
    
    const nuevosDetalles = detalles.map(detalle => {
      if (detalle.id === id) {
        const subtotal = cantidad * detalle.precioUnitario;
        return { ...detalle, cantidad, subtotal };
      }
      return detalle;
    });
    
    setDetalles(nuevosDetalles);
    recalcularTotales(nuevosDetalles);
  };
  
  // Actualizar producto de un detalle
  const actualizarProducto = (id: string, productoId: string) => {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return;
    
    const nuevosDetalles = detalles.map(detalle => {
      if (detalle.id === id) {
        const subtotal = detalle.cantidad * producto.precio;
        return { 
          ...detalle, 
          productoId, 
          producto, 
          precioUnitario: producto.precio,
          subtotal 
        };
      }
      return detalle;
    });
    
    setDetalles(nuevosDetalles);
    recalcularTotales(nuevosDetalles);
  };
  
  // Recalcular totales
  const recalcularTotales = (items: DetalleFactura[]) => {
    const nuevoSubtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const nuevoIva = nuevoSubtotal * 0.16; // 16% de IVA
    const nuevoTotal = nuevoSubtotal + nuevoIva;
    
    setSubtotal(nuevoSubtotal);
    setIva(nuevoIva);
    setTotal(nuevoTotal);
  };
  
  // Guardar factura
  const guardarFactura = () => {
    if (!clienteId || detalles.length === 0) {
      alert('Debe seleccionar un cliente y agregar al menos un producto.');
      return;
    }
    
    const cliente = clientes.find(c => c.id === clienteId);
    if (!cliente) return;
    
    // Crear número de factura (formato: FAC-YYYYMMDD-XXX)
    const hoy = new Date();
    const fechaFormato = `${hoy.getFullYear()}${String(hoy.getMonth() + 1).padStart(2, '0')}${String(hoy.getDate()).padStart(2, '0')}`;
    const numeroFactura = `FAC-${fechaFormato}-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`;
    
    const nuevaFactura: Factura = {
      id: Date.now().toString(),
      numero: numeroFactura,
      fecha,
      clienteId,
      cliente,
      detalles,
      subtotal,
      iva,
      total,
      estado: 'pendiente',
      fechaCreacion: new Date().toISOString()
    };
    
    crearFactura(nuevaFactura);
    navigate('/facturas');
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
        
        <button
          onClick={guardarFactura}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="h-4 w-4 mr-2" />
          Guardar Factura
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Información General</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="cliente" className="block text-sm font-medium text-gray-700">
                Cliente
              </label>
              <select
                id="cliente"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                required
              >
                <option value="">Seleccionar cliente</option>
                {clientes.map(cliente => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombre}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
                Fecha
              </label>
              <input
                type="date"
                id="fecha"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Detalles de Factura</h2>
            <button
              type="button"
              onClick={agregarDetalle}
              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-1" />
              Añadir Línea
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unit.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {detalles.length > 0 ? (
                  detalles.map((detalle) => (
                    <tr key={detalle.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          className="block w-full rounded-md border border-gray-300 py-1.5 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                          value={detalle.productoId}
                          onChange={(e) => actualizarProducto(detalle.id, e.target.value)}
                        >
                          {productos.map(producto => (
                            <option key={producto.id} value={producto.id}>
                              {producto.nombre}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${detalle.precioUnitario.toLocaleString('es-ES')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="1"
                          className="block w-20 rounded-md border border-gray-300 py-1.5 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                          value={detalle.cantidad}
                          onChange={(e) => actualizarCantidad(detalle.id, parseInt(e.target.value) || 1)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${detalle.subtotal.toLocaleString('es-ES')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => eliminarDetalle(detalle.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      No hay productos agregados. Haga clic en "Añadir Línea" para agregar productos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="flex justify-end">
              <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Subtotal:</span>
                  <span className="text-sm font-medium text-gray-900">${subtotal.toLocaleString('es-ES')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">IVA (16%):</span>
                  <span className="text-sm font-medium text-gray-900">${iva.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                  <span className="text-base font-medium text-gray-900">Total:</span>
                  <span className="text-base font-bold text-blue-600">${total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevaFactura;