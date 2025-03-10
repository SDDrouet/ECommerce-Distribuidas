import React from 'react';
import { useAuth } from '../auth/AuthContext';

const Dashboard = () => {
  const { token, user } = useAuth();

  return (
    <div>
      <h1>Dashboard Protegido</h1>
      <p>Esta ruta es accesible solo si estás autenticado.</p>
      <p>
        <strong>Token:</strong> {token}
      </p>
      {user && (
        <div>
          <h2>Información del Usuario</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
