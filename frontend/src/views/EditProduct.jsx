import React, { useEffect, useState } from 'react'
import { getProductById, updateProduct } from '../service/productService'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import DOMPurify from 'dompurify' // Importar para sanitizar entradas
import '../style/CreateProduct.css'

function EditProduct() {
  const { id } = useParams()
  const [product, setProduct] = useState({
    name: '',
    description: '',
    stock: '',
    price: '',
    imageBase64: ''
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getProductById(id).then(data => setProduct(data))
  }, [id])

  // Sanitizar entrada para evitar ataques XSS e inyecciones
  const escapeHTML = (input) => {
    return DOMPurify.sanitize(input)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let sanitizedValue = escapeHTML(value)

    // Validaciones y límites por campo
    if (name === "name" && sanitizedValue.length > 50) return // Nombre máx. 50 caracteres
    if (name === "description" && sanitizedValue.length > 200) return // Descripción máx. 200 caracteres
    if (name === "stock" && (!/^\d+$/.test(sanitizedValue) || sanitizedValue.length > 5)) return // Stock numérico máx. 5 dígitos
    if (name === "price" && (!/^\d+(\.\d{1,2})?$/.test(sanitizedValue) || sanitizedValue.length > 8)) return // Precio con 2 decimales máx.
    if (name === "imageBase64" && sanitizedValue.length > 5000) return // Límite de base64 para evitar ataques DoS

    setProduct({ ...product, [name]: sanitizedValue })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Verificar si los campos son válidos antes de enviar
      if (!product.name || !product.description || !product.stock || !product.price) {
        setError('Todos los campos son obligatorios.')
        return
      }

      await updateProduct(id, product)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Error al actualizar el producto')
    }
  }

  return (
    <>
      {/* Botón para volver a la lista de productos */}
      <button className="back-button" onClick={() => navigate('/')}>
        <FaArrowLeft /> 
      </button>

      <div className="create-product-container">
        <h1>Editar Producto</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="create-product-form">
          
          <div className="form-group">
            <label>Nombre:</label>
            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              maxLength="50"
              pattern="^[a-zA-Z0-9 ]+$"
              title="Solo se permiten letras y números."
            />
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <input
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              maxLength="200"
              title="Máximo 200 caracteres."
            />
          </div>

          <div className="form-group">
            <label>Stock:</label>
            <input
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
              required
              max="99999"
              pattern="^\d+$"
              title="Solo se permiten números."
            />
          </div>

          <div className="form-group">
            <label>Precio:</label>
            <input
              name="price"
              type="number"
              step="0.01"
              value={product.price}
              onChange={handleChange}
              required
              max="999999.99"
              pattern="^\d+(\.\d{1,2})?$"
              title="Debe ser un número válido con hasta 2 decimales."
            />
          </div>

          <div className="form-group">
            <label>Imagen (Base64):</label>
            <textarea
              name="imageBase64"
              value={product.imageBase64}
              onChange={handleChange}
              maxLength="5000"
              title="Máximo 5000 caracteres en base64."
            />
          </div>

          {product.imageBase64 && product.imageBase64.startsWith('data:image') && (
            <div className="image-preview">
              <img src={product.imageBase64} alt="Vista previa del producto" />
            </div>
          )}

          <button type="submit" className="btn-submit">Actualizar Producto</button>
        </form>
      </div>
    </>
  )
}

export default EditProduct
