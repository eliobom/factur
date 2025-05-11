import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Facturas from './pages/Facturas';
import NuevaFactura from './pages/NuevaFactura';
import VerFactura from './pages/VerFactura';
import Clientes from './pages/Clientes';
import Productos from './pages/Productos';
import Configuracion from './pages/Configuracion';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/facturas" element={<Facturas />} />
              <Route path="/facturas/nueva" element={<NuevaFactura />} />
              <Route path="/facturas/:id" element={<VerFactura />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/configuracion" element={<Configuracion />} />
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;