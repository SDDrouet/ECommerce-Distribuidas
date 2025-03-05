import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Callback = () => {
  const [searchParams] = useSearchParams();
  const { exchangeCodeForToken } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      exchangeCodeForToken(code);
    }
  }, [searchParams, exchangeCodeForToken]);

  return (
    <div>
      <h1>Procesando autenticación...</h1>
      <p>Por favor espera mientras se realiza el intercambio del código por un token.</p>
    </div>
  );
};

export default Callback;
