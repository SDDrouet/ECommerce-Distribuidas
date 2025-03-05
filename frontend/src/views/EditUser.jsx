import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../service/userService';
import { FaArrowLeft } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import '../style/EditUser.css';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: '',
    name: '',
    password: '',  // Cambio de "email" a "password"
    role: 'User'
  });
  const [error, setError] = useState(null);

  // 📌 Cargar los datos del usuario al montar el componente
  useEffect(() => {
    getUserById(id)
      .then(data => setUser(data))
      .catch(err => setError('Error al cargar los datos del usuario.'));
  }, [id]);

  // 📌 Sanitizar entrada para evitar ataques XSS e inyecciones SQL/NoSQL
  const escapeHTML = (input) => {
    return DOMPurify.sanitize(input);
  };

  // 📌 Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = escapeHTML(value);

    // Validaciones específicas por campo
    if (name === "name" && !/^[a-zA-Z0-9 ]+$/.test(sanitizedValue)) return; // Solo letras y números
    if (name === "name" && sanitizedValue.length > 50) return; // Límite de caracteres
    if (name === "password" && sanitizedValue.length < 6 && sanitizedValue !== '') return; // Mínimo 6 caracteres para la contraseña, pero no bloquea si está vacío

    setUser({ ...user, [name]: sanitizedValue });
  };

  // 📌 Enviar actualización del usuario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si la contraseña está vacía, no la incluimos en la actualización
    const updatedUser = { ...user };
    if (!updatedUser.password) {
      delete updatedUser.password;
    }

    try {
      // Validar que los campos requeridos no estén vacíos
      if (!user.name.trim() || !user.role) {
        setError('Todos los campos son obligatorios.');
        return;
      }

      await updateUser(id, updatedUser);
      alert('Usuario actualizado correctamente');
      navigate('/users');
    } catch (err) {
      setError('Error al actualizar el usuario.');
    }
  };

  return (
    <div className="edit-user-container">
      <h1>Editar Usuario</h1>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="edit-user-form">
        
        <div className="form-group">
          <label>ID del Usuario:</label>
          <input type="text" name="id" value={user.id} readOnly className="readonly-field" />
          <small>Este campo no se puede modificar.</small>
        </div>

        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
            maxLength="50"
            pattern="^[a-zA-Z0-9 ]+$"
            title="Solo se permiten letras y números."
          />
          <small>Ingrese un nombre de hasta 50 caracteres, solo letras y números.</small>
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            maxLength="100"
            title="La contraseña debe tener al menos 6 caracteres."
          />
          <small>Debe tener al menos 6 caracteres. Si no desea cambiarla, deje este campo vacío.</small>
        </div>

        <div className="form-group">
          <label>Rol:</label>
          <select name="role" value={user.role} onChange={handleChange}>
            <option value="User">Usuario</option>
            <option value="Admin">Administrador</option>
          </select>
        </div>

        {/* Contenedor de botones alineados */}
        <div className="form-actions">
          <button type="button" className="btn-back" onClick={() => navigate('/users')}>
            <FaArrowLeft /> Volver a Usuarios
          </button>
          <button type="submit" className="btn-submit">Actualizar Usuario</button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
