import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, UserPlus } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import ClienteModal from '../components/ClienteModal';
import { Cliente } from '../types';

const Clientes: React.FC = () => {
  const { clientes, eliminarCliente, crearCliente, actualizarCliente } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [clienteActual, setClienteActual] = useState<Cliente | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Filtrar clientes
  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.nif.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleNuevoCliente = () => {
    setClienteActual(null);
    setModalOpen(true);
  };
  
  const handleEditarCliente = (cliente: Cliente) => {
    setClienteActual(cliente);
    setModalOpen(true);
  };
  
  const handleEliminarCliente = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      eliminarCliente(id);
    }
  };
  
  const handleGuardarCliente = (cliente: Cliente) => {
    if (clienteActual) {
      actualizarCliente(cliente);
    } else {
      crearCliente(cliente);
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
            placeholder="Buscar clientes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button
          onClick={handleNuevoCliente}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Cliente
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NIF/CIF
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientesFiltrados.length > 0 ? (
                clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">{cliente.nombre.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{cliente.nombre}</div>
                          <div className="text-sm text-gray-500">{cliente.ciudad}, {cliente.pais}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cliente.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cliente.telefono}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cliente.nif}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        <button
                          onClick={() => handleEditarCliente(cliente)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Editar cliente"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEliminarCliente(cliente.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Eliminar cliente"
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
                        No se encontraron clientes con el término "{searchTerm}".
                        <button 
                          onClick={handleNuevoCliente}
                          className="ml-2 text-blue-600 hover:text-blue-500"
                        >
                          Crear nuevo cliente
                        </button>
                      </>
                    ) : (
                      <>
                        No hay clientes registrados. 
                        <button 
                          onClick={handleNuevoCliente}
                          className="ml-2 text-blue-600 hover:text-blue-500"
                        >
                          Añadir el primer cliente
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {clientes.length === 0 && !searchTerm && (
          <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="rounded-full bg-blue-100 p-3 mb-4">
              <UserPlus className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No hay clientes</h3>
            <p className="text-sm text-gray-500 mb-4 text-center max-w-md">
              Aún no has añadido ningún cliente. Los clientes te permitirán crear facturas asociadas a ellos.
            </p>
            <button
              onClick={handleNuevoCliente}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Añadir cliente
            </button>
          </div>
        )}
      </div>
      
      {/* Modal de creación/edición de cliente */}
      <ClienteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onGuardar={handleGuardarCliente}
        cliente={clienteActual}
      />
    </div>
  );
};

export default Clientes;