import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../service/productService';
import { FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../style/ProductCatalog.css';

function ProductCatalog({ cart, setCart, products }) {
  const navigate = useNavigate();
  const [selectedQuantities, setSelectedQuantities] = useState({});

  useEffect(() => {
    if (products.length > 0) {
      const initialQuantities = {};
      products.forEach(prod => {
        initialQuantities[prod.id] = 1; // Establecer cantidad inicial en 1
      });
      setSelectedQuantities(initialQuantities);
    }
  }, [products]);

  // Validar que `products` está cargado correctamente
  if (!products || products.length === 0) {
    return <div className="loading">Cargando productos...</div>;
  }

  // Ajustar la cantidad de productos sin modificar el carrito aún
  const handleQuantityChange = (productId, change) => {
    setSelectedQuantities(prevQuantities => {
      const newQuantity = (prevQuantities[productId] || 1) + change;
      const product = products.find(p => p.id === productId);

      if (!product) return prevQuantities;
      if (newQuantity < 1) return prevQuantities; // Evitar valores negativos
      if (newQuantity > product.stock) return prevQuantities; // No superar el stock

      return { ...prevQuantities, [productId]: newQuantity };
    });
  };

  // Agregar la cantidad seleccionada al carrito
  const handleAddToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(prevCart => {
      const currentQuantity = prevCart[productId] || 0;
      const newQuantity = currentQuantity + selectedQuantities[productId];

      if (newQuantity > product.stock) {
        alert(`No puedes agregar más de ${product.stock} unidades de ${product.name}.`);
        return prevCart;
      }

      return { ...prevCart, [productId]: newQuantity };
    });
  };

  // Obtener el total de productos en el carrito
  const getTotalItemsInCart = () => {
    return Object.values(cart).reduce((total, qty) => total + qty, 0);
  };

  return (
    <div className="product-catalog-container">
      <div className="header">
        <h1>Catálogo de Productos</h1>
        <div className="cart-icon" onClick={() => navigate('/cart')}>
          <FaShoppingCart size={30} />
          {getTotalItemsInCart() > 0 && (
            <span className="cart-counter">{getTotalItemsInCart()}</span>
          )}
        </div>
      </div>

      <div className="product-grid">
        {products.map((prod) => (
          <div className="product-card fade-in" key={prod.id}>
            {prod.imageBase64 && (
              <img src={`${prod.imageBase64}`} alt={prod.name} className="product-img" />
            )}
            <h3>{prod.name}</h3>
            <p><strong>Precio:</strong> ${prod.price}</p>
            <p><strong>Stock Disponible:</strong> {prod.stock}</p>

            {/* Controles de cantidad */}
            <div className="quantity-controls">
              <button
                className="btn-quantity"
                onClick={() => handleQuantityChange(prod.id, -1)}
                disabled={selectedQuantities[prod.id] <= 1} // Evita negativos
              >
                <FaMinus />
              </button>
              <span className="quantity">{selectedQuantities[prod.id]}</span>
              <button
                className="btn-quantity"
                onClick={() => handleQuantityChange(prod.id, 1)}
                disabled={selectedQuantities[prod.id] >= prod.stock} // Evita superar stock
              >
                <FaPlus />
              </button>
            </div>

            {/* Botón de agregar al carrito */}
            <button
              className="btn-add-cart"
              onClick={() => handleAddToCart(prod.id)}
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCatalog;
