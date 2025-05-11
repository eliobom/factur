import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Producto } from '../types';

interface ProductoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGuardar: (producto: Producto) => void;
  producto: Producto | null;
}

const ProductoModal: React.FC<ProductoModalProps> = ({ 
  isOpen, 
  onClose, 
  onGuardar, 
  producto 
}) => {
  const [formData, setFormData] = useState<Producto>({
    id: '',
    nombre: '',
    codigo: '',
    descripcion: '',
    precio: 0,
    impuesto: 16 // Por defecto 16% de IVA
  });
  
  // Cargar datos del producto si está en modo edición
  useEffect(() => {
    if (producto) {
      setFormData(producto);
    } else {
      setFormData({
        id: Date.now().toString(),
        nombre: '',
        codigo: '',
        descripcion: '',
        precio: 0,
        impuesto: 16
      });
    }
  }, [producto]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;
    
    // Convertir valores numéricos
    if (name === 'precio' || name === 'impuesto') {
      parsedValue = parseFloat(value) || 0;
    }
    
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(formData);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={onClose}
            >
              <span className="sr-only">Cerrar</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {producto ? 'Editar Producto' : 'Nuevo Producto'}
                </h3>
                
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.nombre}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">
                        Código *
                      </label>
                      <input
                        type="text"
                        name="codigo"
                        id="codigo"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.codigo}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
                        Precio *
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="precio"
                          id="precio"
                          min="0"
                          step="0.01"
                          required
                          className="block w-full pl-7 pr-12 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          value={formData.precio}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                        Descripción
                      </label>
                      <textarea
                        name="descripcion"
                        id="descripcion"
                        rows={3}
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.descripcion}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="impuesto" className="block text-sm font-medium text-gray-700">
                        Impuesto (%) *
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="number"
                          name="impuesto"
                          id="impuesto"
                          min="0"
                          max="100"
                          required
                          className="block w-full pr-8 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          value={formData.impuesto}
                          onChange={handleChange}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      {producto ? 'Guardar Cambios' : 'Crear Producto'}
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={onClose}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoModal;