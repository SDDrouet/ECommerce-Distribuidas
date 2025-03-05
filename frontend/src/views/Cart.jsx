import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../service/orderService';
import { updateProductStock } from '../service/productService';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from 'react-icons/fa';
import '../style/Cart.css';

function Cart({ cart, setCart, products }) {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return <div className="cart-container">Cargando productos...</div>;
  }

  if (!cart || Object.keys(cart).length === 0) {
    return <div className="cart-container">Tu carrito está vacío.</div>;
  }

  const handleQuantityChange = (productId, change) => {
    setCart(prevCart => {
      const newQuantity = (prevCart[productId] || 1) + change;
      if (newQuantity < 1) return prevCart; // Evitar negativos

      const product = products.find(p => p.id === productId);
      if (!product || newQuantity > product.stock) return prevCart; // No superar stock

      return { ...prevCart, [productId]: newQuantity };
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      return updatedCart;
    });
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const handleCheckout = async () => {
    if (!cart || Object.keys(cart).length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    const orderDetails = Object.entries(cart).map(([productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      if (!product) {
        console.error(`❌ Producto con ID ${productId} no encontrado.`);
        return null;
      }

      return {
        product: { id: product.id }, // Enviar solo el ID
        quantity,
        subtotal: parseFloat((product.price * quantity).toFixed(2)),
        tax: parseFloat((product.price * quantity * 0.16).toFixed(2)), // 16% de impuestos
        total: parseFloat((product.price * quantity * 1.16).toFixed(2)),
      };
    }).filter(detail => detail !== null); // Filtrar productos no encontrados

    if (orderDetails.length === 0) {
      alert('Error: No hay productos válidos en la orden.');
      return;
    }

    const subTotalCost = orderDetails.reduce((acc, item) => acc + item.subtotal, 0);
    const totalCost = orderDetails.reduce((acc, item) => acc + item.total, 0);

    const newOrder = {
      user: { id: '67c72f7ea5dca71cc0f6377c' }, // Simulación de usuario
      address: 'Dirección de prueba',
      orderDetails,
      subTotalCost,
      totalCost
    };

    console.log("📦 Enviando orden a la API:", JSON.stringify(newOrder, null, 2));

    try {
      const response = await createOrder(newOrder);
      console.log("✅ Respuesta del servidor:", response);

      if (!response || !response.id) {
        throw new Error('La respuesta del servidor no es válida.');
      }

      // 🔥 ACTUALIZAR STOCK DESPUÉS DE LA COMPRA 🔥
      await Promise.all(orderDetails.map(async (orderDetail) => {
        const product = products.find(p => p.id === orderDetail.product.id);
        if (product) {
          const updatedStock = product.stock - orderDetail.quantity;
          try {
            await updateProductStock(product.id, updatedStock);
            console.log(`✅ Stock actualizado para ${product.name} (${product.id}): ${updatedStock}`);
          } catch (stockError) {
            console.error(`❌ Error al actualizar stock para ${product.id}:`, stockError);
          }
        }
      }));

      alert('Compra realizada con éxito');
      setCart({});
      navigate('/orders');
    } catch (error) {
      console.error("❌ Error en la API:", error.response ? error.response.data : error.message);
      alert(`Error al procesar la compra: ${error.response?.data || error.message}`);
    }
  };

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Total</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(cart).map(([productId, quantity]) => {
            const product = products.find(p => p.id === productId);
            if (!product) return null;
            return (
              <tr key={productId}>
                <td>{product.name}</td>
                <td>
                  <button className="btn-quantity" onClick={() => handleQuantityChange(productId, -1)}>
                    <FaMinus />
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button className="btn-quantity" onClick={() => handleQuantityChange(productId, 1)}>
                    <FaPlus />
                  </button>
                </td>
                <td>${product.price.toFixed(2)}</td>
                <td>${(product.price * quantity).toFixed(2)}</td>
                <td>
                  <FaTrash className="icon delete" onClick={() => handleRemoveFromCart(productId)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Contenedor de botones alineados */}
      <div className="cart-actions">
        <button className="btn-back" onClick={() => navigate('/catalog')}>
          <FaArrowLeft /> Volver al Catálogo
        </button>
        <button className="btn-checkout" onClick={handleCheckout}>Proceder con la Compra</button>
      </div>
    </div>
  );
}

export default Cart;
