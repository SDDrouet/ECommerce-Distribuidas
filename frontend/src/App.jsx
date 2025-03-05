import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './views/ProductList';
import ProductDetail from './views/ProductDetail';
import CreateProduct from './views/CreateProduct';
import OrderList from './views/OrderList';
import OrderDetail from './views/OrderDetail';
import UserLogin from './views/UserLogin';
import UserRegister from './views/UserRegister';
import EditProduct from './views/EditProduct';
import ProductCatalog from './views/ProductCatalog';
import Cart from './views/Cart';
import UserList from './views/UserList';
import { getAllProducts } from './service/productService';
import EditUser from './views/EditUser';
import './App.css';

function App() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]); // Estado global para compartir productos

  // 📌 Cargar productos al inicio de la app
  useEffect(() => {
    getAllProducts().then(data => setProducts(data));
  }, []);

  return (
    <Router>
      <Navbar cart={cart} /> {/* Pasamos cart al Navbar */}

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/catalog" element={<ProductCatalog cart={cart} setCart={setCart} products={products} />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} products={products} />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
