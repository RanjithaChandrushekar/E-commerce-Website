import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1rem' }}>
      {/* Hero Section */}
      <div 
        style={{ 
          background: 'rgba(255, 255, 255, 0.92)', 
          padding: '4rem 2rem', 
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          marginBottom: '3rem'
        }}
      >
        <span style={{ 
          background: '#e3f2fd', 
          color: '#0d6efd', 
          padding: '0.4rem 1rem', 
          borderRadius: '20px', 
          fontSize: '0.9rem', 
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          New Collection 2026
        </span>
        <h1 style={{ fontSize: '3.5rem', margin: '1rem 0', color: '#222', fontWeight: '800' }}>
          Shop Smarter, Live Better
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Explore premium electronics, trendy fashion, and daily lifestyle essentials curated just for you. Fast shipping & secure checkout.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link to="/products">
            <button style={{ padding: '0.9rem 2.5rem', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '30px' }}>
              Explore Products
            </button>
          </Link>
          <Link to="/register">
            <button style={{ padding: '0.9rem 2.5rem', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '30px', background: '#343a40' }}>
              Create Account
            </button>
          </Link>
        </div>
      </div>

      {/* Features Grid Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem',
        textAlign: 'center'
      }}>
        <div className="card feature-card">
          <h3 style={{ color: '#0d6efd', marginBottom: '0.5rem' }}>🚚 Free Shipping</h3>
          <p style={{ color: '#666', fontSize: '0.95rem' }}>On all orders over $50 delivered straight to your doorstep.</p>
        </div>
        <div className="card feature-card">
          <h3 style={{ color: '#28a745', marginBottom: '0.5rem' }}>🔒 Secure Payment</h3>
          <p style={{ color: '#666', fontSize: '0.95rem' }}>Protected by industry-standard encryption and secure token auth.</p>
        </div>
        <div className="card feature-card">
          <h3 style={{ color: '#ffc107', marginBottom: '0.5rem' }}>⭐ 24/7 Support</h3>
          <p style={{ color: '#666', fontSize: '0.95rem' }}>Dedicated customer service ready to assist you anytime.</p>
        </div>
      </div>
    </div>
  );
}