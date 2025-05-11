import React from 'react';
import { BarChart, PieChart, DollarSign, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import StatCard from '../components/StatCard';
import AreaChart from '../components/charts/AreaChart';
import BarChartComponent from '../components/charts/BarChart';

const Dashboard: React.FC = () => {
  const { facturas, clientes, productos } = useData();
  
  // Calcular estadísticas
  const totalFacturado = facturas.reduce((total, factura) => total + factura.total, 0);
  const facturasPendientes = facturas.filter(f => f.estado === 'pendiente').length;
  const facturasPagadas = facturas.filter(f => f.estado === 'pagada').length;
  
  // Datos para gráficos
  const ventasPorMes = [
    { name: 'Ene', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Abr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
  ];
  
  const productosMasVendidos = [
    { name: 'Producto A', value: 35 },
    { name: 'Producto B', value: 25 },
    { name: 'Producto C', value: 20 },
    { name: 'Producto D', value: 15 },
    { name: 'Producto E', value: 5 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Facturado" 
          value={`$${totalFacturado.toLocaleString('es-ES')}`} 
          icon={<DollarSign className="h-8 w-8 text-blue-500" />}
          change={"+12.5%"}
          changeType="positive"
        />
        <StatCard 
          title="Facturas Pendientes" 
          value={facturasPendientes.toString()} 
          icon={<BarChart className="h-8 w-8 text-yellow-500" />}
          change={"-2.1%"}
          changeType="negative"
        />
        <StatCard 
          title="Clientes" 
          value={clientes.length.toString()} 
          icon={<Users className="h-8 w-8 text-purple-500" />}
          change={"+3.2%"}
          changeType="positive"
        />
        <StatCard 
          title="Productos" 
          value={productos.length.toString()} 
          icon={<ShoppingBag className="h-8 w-8 text-green-500" />}
          change={"+0.8%"}
          changeType="positive"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Ventas Mensuales</h2>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </div>
          <div className="h-64">
            <AreaChart data={ventasPorMes} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Productos Más Vendidos</h2>
            <PieChart className="h-5 w-5 text-blue-500" />
          </div>
          <div className="h-64">
            <BarChartComponent data={productosMasVendidos} />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Últimas Facturas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Núm.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {facturas.slice(0, 5).map((factura) => (
                <tr key={factura.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{factura.numero}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{factura.cliente.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{factura.fecha}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${factura.total.toLocaleString('es-ES')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                      factura.estado === 'pagada' 
                        ? 'bg-green-100 text-green-800' 
                        : factura.estado === 'pendiente'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {factura.estado.charAt(0).toUpperCase() + factura.estado.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;