import React, { useState } from 'react';
import { registerUser } from '../service/userService';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css'; // Asegúrate de tener un archivo CSS para estilos

const UserRegister = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    role: 'user',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de entrada
    if (!user.username || !user.password || !user.email) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (user.username.length < 3 || user.username.length > 50) {
      setError('El nombre de usuario debe tener entre 3 y 50 caracteres.');
      return;
    }
    if (user.password.length < 6 || user.password.length > 20) {
      setError('La contraseña debe tener entre 6 y 20 caracteres.');
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(user.email)) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }

    try {
      await registerUser(user);
      navigate('/login'); // Redirige a login tras registrarse
    } catch (err) {
      setError('Error al registrarse');
    }
  };

  return (
    <div className="register-container">
      <h1>Registro de Usuario</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Usuario:</label>
          <input
            name="username"
            value={user.username}
            onChange={handleChange}
            required
            maxLength="50"
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            required
            minLength="6"
            maxLength="20"
          />
        </div>
        <div className="form-group">
          <label>Rol:</label>
          <select name="role" value={user.role} onChange={handleChange}>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">Registrarse</button>
      </form>
    </div>
  );
};

export default UserRegister;
