import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const { data } = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      // Save user session in context and localStorage
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));

      // Redirect to home/products page on successful login
      navigate('/');
    } catch (err) {
      // Display exact error message from backend if available
      alert(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '0.7rem' }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}