import React, { useEffect, useState } from 'react';
import { getOrderById } from '../service/orderService';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div>Cargando pedido...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!order) return <div>Pedido no encontrado</div>;

  return (
    <div>
      <h1>Pedido {order.id}</h1>
      <p><strong>Usuario:</strong> {order.user.username}</p>
      <p><strong>Dirección:</strong> {order.address}</p>
      <p><strong>Subtotal:</strong> ${order.subTotalCost}</p>
      <p><strong>Total:</strong> ${order.totalCost}</p>
      <h2>Detalles del Pedido</h2>
      <ul>
        {order.orderDetails.map((detail, index) => (
          <li key={index}>
            Producto: {detail.product.name} - Cantidad: {detail.quantity} - Total: ${detail.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetail;
