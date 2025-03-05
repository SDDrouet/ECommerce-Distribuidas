import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Navbar.css'
import logo from '../img/ecovidalogo.png' // Ajusta la ruta y el nombre de tu imagen

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Contenedor para el logo y el texto */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="navbar-brand">ECommerce</h1>
      </div>
      {/* Enlaces de navegación */}
      <ul className="navbar-links">
        <li><Link to="/">Productos</Link></li>
        <li><Link to="/catalog">Catálogo</Link></li> {/* Nuevo enlace al catálogo */}
        <li><Link to="/orders">Pedidos</Link></li>
        <li><Link to="/users">Usuarios</Link></li>
        <li><Link to="/login">Iniciar Sesión</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
