import React, { useEffect, useState } from 'react';
import { getProductById } from '../service/productService';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div>Cargando producto...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return <div>Producto no encontrado</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      {product.imageBase64 && (
        <img 
          src={`data:image/png;base64,${product.imageBase64}`} 
          alt={product.name} 
          width="200" 
        />
      )}
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
};

export default ProductDetail;
