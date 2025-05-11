import React, { createContext, useContext, useState, useEffect } from 'react';
import { Factura, Cliente, Producto, Configuracion } from '../types';
import datosIniciales from '../data/initialData';

interface DataContextType {
  facturas: Factura[];
  clientes: Cliente[];
  productos: Producto[];
  configuracion: Configuracion;
  crearFactura: (factura: Factura) => void;
  actualizarFactura: (factura: Factura) => void;
  eliminarFactura: (id: string) => void;
  cambiarEstadoFactura: (id: string, estado: 'pendiente' | 'pagada' | 'cancelada') => void;
  crearCliente: (cliente: Cliente) => void;
  actualizarCliente: (cliente: Cliente) => void;
  eliminarCliente: (id: string) => void;
  crearProducto: (producto: Producto) => void;
  actualizarProducto: (producto: Producto) => void;
  eliminarProducto: (id: string) => void;
  actualizarConfiguracion: (config: Configuracion) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe ser usado dentro de un DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Intentar cargar datos del localStorage o usar datos iniciales
  const [facturas, setFacturas] = useState<Factura[]>(() => {
    const savedData = localStorage.getItem('facturaProFacturas');
    return savedData ? JSON.parse(savedData) : datosIniciales.facturas;
  });
  
  const [clientes, setClientes] = useState<Cliente[]>(() => {
    const savedData = localStorage.getItem('facturaProClientes');
    return savedData ? JSON.parse(savedData) : datosIniciales.clientes;
  });
  
  const [productos, setProductos] = useState<Producto[]>(() => {
    const savedData = localStorage.getItem('facturaProProductos');
    return savedData ? JSON.parse(savedData) : datosIniciales.productos;
  });
  
  const [configuracion, setConfiguracion] = useState<Configuracion>(() => {
    const savedData = localStorage.getItem('facturaProConfiguracion');
    return savedData ? JSON.parse(savedData) : datosIniciales.configuracion;
  });
  
  // Guardar cambios en localStorage cuando cambian los datos
  useEffect(() => {
    localStorage.setItem('facturaProFacturas', JSON.stringify(facturas));
  }, [facturas]);
  
  useEffect(() => {
    localStorage.setItem('facturaProClientes', JSON.stringify(clientes));
  }, [clientes]);
  
  useEffect(() => {
    localStorage.setItem('facturaProProductos', JSON.stringify(productos));
  }, [productos]);
  
  useEffect(() => {
    localStorage.setItem('facturaProConfiguracion', JSON.stringify(configuracion));
  }, [configuracion]);
  
  // Funciones para manipular facturas
  const crearFactura = (factura: Factura) => {
    setFacturas([...facturas, factura]);
  };
  
  const actualizarFactura = (factura: Factura) => {
    setFacturas(facturas.map(f => f.id === factura.id ? factura : f));
  };
  
  const eliminarFactura = (id: string) => {
    setFacturas(facturas.filter(f => f.id !== id));
  };
  
  const cambiarEstadoFactura = (id: string, estado: 'pendiente' | 'pagada' | 'cancelada') => {
    setFacturas(facturas.map(f => 
      f.id === id ? { ...f, estado } : f
    ));
  };
  
  // Funciones para manipular clientes
  const crearCliente = (cliente: Cliente) => {
    setClientes([...clientes, cliente]);
  };
  
  const actualizarCliente = (cliente: Cliente) => {
    setClientes(clientes.map(c => c.id === cliente.id ? cliente : c));
  };
  
  const eliminarCliente = (id: string) => {
    setClientes(clientes.filter(c => c.id !== id));
  };
  
  // Funciones para manipular productos
  const crearProducto = (producto: Producto) => {
    setProductos([...productos, producto]);
  };
  
  const actualizarProducto = (producto: Producto) => {
    setProductos(productos.map(p => p.id === producto.id ? producto : p));
  };
  
  const eliminarProducto = (id: string) => {
    setProductos(productos.filter(p => p.id !== id));
  };
  
  // Función para actualizar configuración
  const actualizarConfiguracion = (config: Configuracion) => {
    setConfiguracion(config);
  };
  
  const value = {
    facturas,
    clientes,
    productos,
    configuracion,
    crearFactura,
    actualizarFactura,
    eliminarFactura,
    cambiarEstadoFactura,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    actualizarConfiguracion
  };
  
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};