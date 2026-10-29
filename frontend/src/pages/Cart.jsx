import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(localCart);

    // Fetch database cart if user is logged in
    if (user && user.token) {
      axios
        .get('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => {
          if (res.data && res.data.cartItems) {
            setCart(res.data.cartItems);
            localStorage.setItem('cart', JSON.stringify(res.data.cartItems));
          }
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const removeFromCart = async (productId) => {
    const updated = cart.filter((x) => (x.product || x._id) !== productId);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));

    if (user && user.token) {
      try {
        await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } catch (err) {
        console.error('Error removing item from DB cart:', err);
      }
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/products">Go Shopping</Link>
        </p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.product || item._id}
              className="card"
              style={{
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
              <h4>{item.name}</h4>
              <p>
                ${item.price.toFixed(2)} x {item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item.product || item._id)}
                style={{ background: '#dc3545' }}
              >
                Remove
              </button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={() => navigate('/checkout')} style={{ marginTop: '1rem' }}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}