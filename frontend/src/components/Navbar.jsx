import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <h2><Link to="/" style={{ color: '#fff' }}>SHOPLY</Link></h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        {user ? (
          <>
            <Link to="/profile">Account</Link>
            <button onClick={logout} style={{ background: '#dc3545', marginLeft: '1.5rem' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}