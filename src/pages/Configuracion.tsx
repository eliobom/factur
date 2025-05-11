import React, { useState } from 'react';
import { Building, Save, RefreshCw } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const Configuracion: React.FC = () => {
  const { configuracion, actualizarConfiguracion } = useData();
  
  const [formData, setFormData] = useState({
    nombreEmpresa: configuracion.nombreEmpresa,
    nif: configuracion.nif,
    direccion: configuracion.direccion,
    codigoPostal: configuracion.codigoPostal,
    ciudad: configuracion.ciudad,
    pais: configuracion.pais,
    telefono: configuracion.telefono,
    email: configuracion.email,
    sitioWeb: configuracion.sitioWeb,
    moneda: configuracion.moneda,
    impuesto: configuracion.impuesto,
    logoUrl: configuracion.logoUrl
  });
  
  const [guardando, setGuardando] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    
    // Simular guardado asíncrono
    setTimeout(() => {
      actualizarConfiguracion(formData);
      setGuardando(false);
    }, 500);
  };
  
  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <Building className="h-6 w-6 text-blue-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Datos de la Empresa</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="nombreEmpresa" className="block text-sm font-medium text-gray-700">
                  Nombre de la Empresa
                </label>
                <input
                  type="text"
                  name="nombreEmpresa"
                  id="nombreEmpresa"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.nombreEmpresa}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="nif" className="block text-sm font-medium text-gray-700">
                  NIF/CIF
                </label>
                <input
                  type="text"
                  name="nif"
                  id="nif"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.nif}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-6">
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

              <div className="sm:col-span-2">
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

              <div className="sm:col-span-2">
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

              <div className="sm:col-span-2">
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

              <div className="sm:col-span-3">
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

              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="sitioWeb" className="block text-sm font-medium text-gray-700">
                  Sitio Web
                </label>
                <input
                  type="text"
                  name="sitioWeb"
                  id="sitioWeb"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.sitioWeb}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">
                  URL del Logo
                </label>
                <input
                  type="text"
                  name="logoUrl"
                  id="logoUrl"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.logoUrl}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Configuración de Facturación</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="moneda" className="block text-sm font-medium text-gray-700">
                  Moneda
                </label>
                <select
                  id="moneda"
                  name="moneda"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.moneda}
                  onChange={handleChange}
                >
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">Dólar estadounidense ($)</option>
                  <option value="MXN">Peso mexicano ($)</option>
                  <option value="COP">Peso colombiano ($)</option>
                  <option value="ARS">Peso argentino ($)</option>
                  <option value="CLP">Peso chileno ($)</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="impuesto" className="block text-sm font-medium text-gray-700">
                  Impuesto por defecto (%)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="impuesto"
                    id="impuesto"
                    min="0"
                    max="100"
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
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={guardando}
          >
            {guardando ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Configuracion;