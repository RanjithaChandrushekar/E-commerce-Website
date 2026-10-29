import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:5000/api/orders/myorders', {
        headers: { Authorization: `Bearer ${user.token}` }
      }).then((res) => setOrders(res.data));
    }
  }, [user]);

  return (
    <div className="container">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      
      <h3 style={{ marginTop: '2rem' }}>Order History</h3>
      {orders.length === 0 ? <p>No orders found.</p> : (
        orders.map((order) => (
          <div key={order._id} className="card" style={{ marginTop: '1rem' }}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ${order.totalPrice}</p>
            <p><strong>Paid:</strong> {order.isPaid ? 'Yes' : 'No'}</p>
          </div>
        ))
      )}
    </div>
  );
}