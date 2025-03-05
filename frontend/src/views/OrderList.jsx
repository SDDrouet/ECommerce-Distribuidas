import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, deleteOrder } from '../service/orderService';
import { FaSyncAlt, FaTrash } from 'react-icons/fa';
import '../style/OrderList.css';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllOrders().then(data => setOrders(data));
  }, []);

  const handleDeleteClick = (order, event) => {
    event.stopPropagation();
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedOrder) {
      await deleteOrder(selectedOrder.id);
      setOrders(orders.filter(ord => ord.id !== selectedOrder.id));
    }
    setShowDeleteModal(false);
    setSelectedOrder(null);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  return (
    <div className="order-list-container">
      <div className="header">
        <h1>Lista de Pedidos</h1>
        <button className="btn-refresh" onClick={() => window.location.reload()}>
          <FaSyncAlt size={20} className="refresh-icon" />
        </button>
      </div>

      <div className="order-grid">
        {orders.map((order, index) => (
          <div 
            className="order-card fade-in" 
            key={order.id} 
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleOrderClick(order)}
          >
            <h3>Pedido #{order.id}</h3>
            <p><strong>Total:</strong> ${order.totalCost.toFixed(2)}</p>
            <div className="actions">
              <FaTrash className="icon delete" onClick={(e) => handleDeleteClick(order, e)} />
            </div>
          </div>
        ))}
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>¿Estás seguro?</h2>
            <p>Eliminarás el pedido <strong>#{selectedOrder?.id}</strong>. Esta acción no se puede deshacer.</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
              <button className="btn-delete" onClick={handleDeleteConfirm}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de detalles del pedido con mejor formato */}
      {showDetailModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="modal detail-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Detalles del Pedido <span className="order-id">#{selectedOrder.id}</span></h2>
            <p><strong>Dirección:</strong> {selectedOrder.address}</p>
            <p><strong>Subtotal:</strong> ${selectedOrder.subTotalCost.toFixed(2)}</p>
            <p><strong>Total:</strong> ${selectedOrder.totalCost.toFixed(2)}</p>

            <table className="order-detail-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.orderDetails.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.product.name}</td>
                    <td>{detail.quantity}</td>
                    <td>${detail.product.price.toFixed(2)}</td>
                    <td>${detail.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="btn-close" onClick={() => setShowDetailModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderList;
