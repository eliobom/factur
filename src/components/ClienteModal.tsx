import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Cliente } from '../types';

interface ClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGuardar: (cliente: Cliente) => void;
  cliente: Cliente | null;
}

const ClienteModal: React.FC<ClienteModalProps> = ({ 
  isOpen, 
  onClose, 
  onGuardar, 
  cliente 
}) => {
  const [formData, setFormData] = useState<Cliente>({
    id: '',
    nombre: '',
    email: '',
    telefono: '',
    nif: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    pais: '',
    notas: ''
  });
  
  // Cargar datos del cliente si está en modo edición
  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    } else {
      setFormData({
        id: Date.now().toString(),
        nombre: '',
        email: '',
        telefono: '',
        nif: '',
        direccion: '',
        ciudad: '',
        codigoPostal: '',
        pais: '',
        notas: ''
      });
    }
  }, [cliente]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
                  {cliente ? 'Editar Cliente' : 'Nuevo Cliente'}
                </h3>
                
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                        Nombre o Razón Social *
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
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                        Teléfono
                      </label>
                      <input
                        type="text"
                        name="telefono"
                        id="telefono"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.telefono}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="nif" className="block text-sm font-medium text-gray-700">
                        NIF/CIF *
                      </label>
                      <input
                        type="text"
                        name="nif"
                        id="nif"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.nif}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                        Dirección
                      </label>
                      <input
                        type="text"
                        name="direccion"
                        id="direccion"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.direccion}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        name="ciudad"
                        id="ciudad"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.ciudad}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        name="codigoPostal"
                        id="codigoPostal"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.codigoPostal}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="pais" className="block text-sm font-medium text-gray-700">
                        País
                      </label>
                      <input
                        type="text"
                        name="pais"
                        id="pais"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.pais}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="notas" className="block text-sm font-medium text-gray-700">
                        Notas
                      </label>
                      <textarea
                        name="notas"
                        id="notas"
                        rows={3}
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.notas}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      {cliente ? 'Guardar Cambios' : 'Crear Cliente'}
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

export default ClienteModal;