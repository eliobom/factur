import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { user } = useAuth();
  
  return (
    <header className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Abrir sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
        
        <div className="flex-1 flex justify-between items-center">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900">
              {getPageTitle(window.location.hash)}
            </h1>
          </div>
          
          <div className="ml-4 flex items-center md:ml-6">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="sr-only">Ver notificaciones</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Perfil */}
            <div className="ml-3 relative">
              <div className="flex items-center">
                <span className="hidden md:block mr-3 text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const getPageTitle = (hash: string): string => {
  switch (true) {
    case hash.includes('/dashboard'):
      return 'Dashboard';
    case hash.includes('/facturas/nueva'):
      return 'Nueva Factura';
    case hash.includes('/facturas/'):
      return 'Detalles de Factura';
    case hash.includes('/facturas'):
      return 'Facturas';
    case hash.includes('/clientes'):
      return 'Clientes';
    case hash.includes('/productos'):
      return 'Productos';
    case hash.includes('/configuracion'):
      return 'Configuración';
    default:
      return 'Dashboard';
  }
};

export default Header;