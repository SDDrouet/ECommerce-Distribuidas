import React from 'react';
import { useAuth } from '../auth/AuthContext';

const Home = () => {
  const { token, login } = useAuth();

  return (
    <div>
      <h1>Página Pública</h1>
      {token ? (
        <p>Ya estás autenticado.</p>
      ) : (
        <button onClick={login}>Iniciar sesión con OAuth</button>
      )}
    </div>
  );
};

export default Home;
