import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, changeUserRole } from '../service/userService';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../style/UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("❌ Error al cargar usuarios:", error);
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser.id);
      setUsers(users.filter(u => u.id !== selectedUser.id));
    }
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await changeUserRole(userId, newRole);
      setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
    } catch (error) {
      console.error("❌ Error al cambiar rol:", error);
    }
  };

  return (
    <div className="user-list-container">
      <div className="header">
        <h1>Lista de Usuarios</h1>
        <button className="btn-add" onClick={() => navigate('/register')}>
          <FaPlus size={20} /> Agregar Usuario
        </button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>
                <select
                  className="role-select"
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="user">Usuario</option>
                  <option value="moderator">Moderador</option>
                </select>
              </td>
              <td>
                <FaEdit className="icon edit" onClick={() => navigate(`/edit-user/${user.id}`)} />
                <FaTrash className="icon delete" onClick={() => handleDeleteClick(user)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>¿Eliminar usuario?</h2>
            <p>¿Seguro que deseas eliminar a <strong>{selectedUser?.username}</strong>?</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
              <button className="btn-delete" onClick={handleDeleteConfirm}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;
