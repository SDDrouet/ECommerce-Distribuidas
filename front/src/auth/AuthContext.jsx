import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

// Configuración (ajusta estas variables según tu entorno)
const AUTH_SERVER_BASE_URL = 'http://localhost:9000'; // URL de tu servidor de autorización
const CLIENT_ID = 'oidc-client';
const CLIENT_SECRET = 'secret'; // ¡Atención! No exponer en producción
const REDIRECT_URI = 'http://localhost:5173/authentication/callback'; // Debe coincidir con el redirectUri configurado en el backend

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Guarda o elimina el token en localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = () => {
    // Construir la URL de autorización
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: 'openid profile',
      state: 'xyz' // En producción, generar un valor aleatorio y verificarlo en el callback
    });

    window.location.href = `${AUTH_SERVER_BASE_URL}/oauth2/authorize?${params.toString()}`;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/');
  };

  const exchangeCodeForToken = async (code) => {
    try {
      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI
      });
  
      // Codifica en base64: client_id:client_secret
      const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  
      const response = await fetch(`${AUTH_SERVER_BASE_URL}/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${credentials}`
        },
        body: params.toString()
      });
  
      const data = await response.json();
      if (data.access_token) {
        setToken(data.access_token);
        setUser(data.user); // Asumiendo que el backend devuelve la información del usuario
        localStorage.setItem('user', JSON.stringify(data.user)); // Guarda la info del usuario en localStorage
        navigate('/dashboard');
      } else {
        console.error('Error en el intercambio del token:', data);
      }
    } catch (error) {
      console.error('Error al intercambiar el código por token:', error);
    }
  };
  
  

  
  return (
    <AuthContext.Provider value={{ token, user, login, logout, exchangeCodeForToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
