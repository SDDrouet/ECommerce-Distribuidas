import React, { useEffect, useState } from 'react'
import { getAllProducts, deleteProduct } from '../service/productService'
import { FaSyncAlt, FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import '../style/ProductList.css'
import '../style/ProductDetail.css' // Importar estilos del popup de detalles

function ProductList() {
  const [products, setProducts] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getAllProducts().then(data => setProducts(data))
  }, [])

  const handleDeleteClick = (product, event) => {
    event.stopPropagation() // Evitar que el click en la tarjeta active el modal de detalles
    setSelectedProduct(product)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedProduct) {
      await deleteProduct(selectedProduct.id)
      setProducts(products.filter(prod => prod.id !== selectedProduct.id))
    }
    setShowDeleteModal(false)
    setSelectedProduct(null)
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setShowDetailModal(true)
  }

  return (
    <div className="product-list-container">
      <div className="header">
        <h1>Lista de Productos</h1>
        <div className="header-actions">
          <button className="btn-add" onClick={() => navigate('/create-product')}>
            <FaPlus size={20} />
          </button>
          <button className="btn-refresh" onClick={() => window.location.reload()}>
            <FaSyncAlt size={20} className="refresh-icon" />
          </button>
        </div>
      </div>

      <div className="product-grid">
        {products.map((prod, index) => (
          <div 
            className="product-card fade-in" 
            key={prod.id} 
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleProductClick(prod)} // Asegurar que haga click en la tarjeta
          >
            {prod.imageBase64 && (
              <img src={`${prod.imageBase64}`} alt={prod.name} className="product-img" />
            )}
            <h3>{prod.name}</h3>
            <p><strong>Precio:</strong> ${prod.price}</p>
            <p><strong>Stock:</strong> {prod.stock}</p>
            <div className="actions">
              <FaEdit className="icon edit" onClick={(e) => { e.stopPropagation(); navigate(`/edit-product/${prod.id}`) }} />
              <FaTrash className="icon delete" onClick={(e) => handleDeleteClick(prod, e)} />
            </div>
          </div>
        ))}
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>¿Estás seguro?</h2>
            <p>Eliminarás el producto <strong>{selectedProduct?.name}</strong>. Esta acción no se puede deshacer.</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
              <button className="btn-delete" onClick={handleDeleteConfirm}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de detalles del producto */}
      {showDetailModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="modal detail-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProduct.name}</h2>
            {selectedProduct.imageBase64 && (
              <img src={`${selectedProduct.imageBase64}`} alt={selectedProduct.name} className="detail-img" />
            )}
            <p><strong>Descripción:</strong> {selectedProduct.description}</p>
            <p><strong>Precio:</strong> ${selectedProduct.price}</p>
            <p><strong>Stock:</strong> {selectedProduct.stock}</p>
            <button className="btn-close" onClick={() => setShowDetailModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductList
