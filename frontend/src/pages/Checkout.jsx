import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function Checkout() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    try {
      await axios.post('http://localhost:5000/api/orders', {
        orderItems: cart,
        shippingAddress: { address, city, postalCode, country },
        paymentMethod,
        totalPrice
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      localStorage.removeItem('cart');
      alert('Order Placed Successfully!');
      navigate('/profile');
    } catch (err) {
      alert(err.response?.data?.message || 'Error placing order');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px' }}>
      <h2>Shipping & Payment</h2>
      <form onSubmit={placeOrder}>
        <label>Address</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <label>City</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
        <label>Postal Code</label>
        <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
        <label>Country</label>
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
        <label>Payment Method</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="PayPal">PayPal / Credit Card</option>
          <option value="Stripe">Stripe</option>
        </select>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}