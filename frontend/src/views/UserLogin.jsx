import React, { useState } from 'react';
import { loginUser } from '../service/userService';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css'; // Asegúrate de tener un archivo CSS para estilos

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de entrada
    if (!username || !password) {
      setError('Usuario y contraseña son obligatorios.');
      return;
    }
    if (username.length < 3 || username.length > 50) {
      setError('El usuario debe tener entre 3 y 50 caracteres.');
      return;
    }
    if (password.length < 6 || password.length > 20) {
      setError('La contraseña debe tener entre 6 y 20 caracteres.');
      return;
    }

    try {
      const user = await loginUser(username, password);
      console.log('Usuario autenticado:', user);
      navigate('/'); // Redirige al inicio tras el login
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            maxLength="50"
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            maxLength="20"
          />
        </div>
        <button type="submit" className="btn-submit">Iniciar Sesión</button>
      </form>
      <div className="register-link">
        <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
      </div>
    </div>
  );
};

export default UserLogin;
