import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exist = cart.find((x) => x.product === product._id);
    if (exist) {
      cart.map((x) => (x.product === product._id ? x.quantity += 1 : x));
    } else {
      cart.push({ product: product._id, name: product.name, price: product.price, image: product.image, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  return (
    <div className="container" style={{ display: 'flex', gap: '2rem' }}>
      <img src={product.image} alt={product.name} style={{ width: '400px', height: '400px', objectFit: 'cover' }} />
      <div>
        <h2>{product.name}</h2>
        <p style={{ margin: '1rem 0' }}>{product.description}</p>
        <h3>${product.price}</h3>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
}