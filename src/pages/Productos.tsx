import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Package } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import ProductoModal from '../components/ProductoModal';
import { Producto } from '../types';

const Productos: React.FC = () => {
  const { productos, eliminarProducto, crearProducto, actualizarProducto } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [productoActual, setProductoActual] = useState<Producto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Filtrar productos
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleNuevoProducto = () => {
    setProductoActual(null);
    setModalOpen(true);
  };
  
  const handleEditarProducto = (producto: Producto) => {
    setProductoActual(producto);
    setModalOpen(true);
  };
  
  const handleEliminarProducto = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      eliminarProducto(id);
    }
  };
  
  const handleGuardarProducto = (producto: Producto) => {
    if (productoActual) {
      actualizarProducto(producto);
    } else {
      crearProducto(producto);
    }
    setModalOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="text" 
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Buscar productos..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button
          onClick={handleNuevoProducto}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Producto
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Impuesto
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((producto) => (
                  <tr key={producto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-green-100 rounded-full flex items-center justify-center">
                          <Package className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{producto.nombre}</div>
                          <div className="text-sm text-gray-500">{producto.descripcion}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {producto.codigo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${producto.precio.toLocaleString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {producto.impuesto}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        <button
                          onClick={() => handleEditarProducto(producto)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Editar producto"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEliminarProducto(producto.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Eliminar producto"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    {searchTerm ? (
                      <>
                        No se encontraron productos con el término "{searchTerm}".
                        <button 
                          onClick={handleNuevoProducto}
                          className="ml-2 text-blue-600 hover:text-blue-500"
                        >
                          Crear nuevo producto
                        </button>
                      </>
                    ) : (
                      <>
                        No hay productos registrados. 
                        <button 
                          onClick={handleNuevoProducto}
                          className="ml-2 text-blue-600 hover:text-blue-500"
                        >
                          Añadir el primer producto
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {productos.length === 0 && !searchTerm && (
          <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Package className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No hay productos</h3>
            <p className="text-sm text-gray-500 mb-4 text-center max-w-md">
              Aún no has añadido ningún producto. Los productos te permitirán agregarlos a tus facturas.
            </p>
            <button
              onClick={handleNuevoProducto}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Añadir producto
            </button>
          </div>
        )}
      </div>
      
      {/* Modal de creación/edición de producto */}
      <ProductoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onGuardar={handleGuardarProducto}
        producto={productoActual}
      />
    </div>
  );
};

export default Productos;