import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // List of available categories matching your seeded products
  const categories = ['All', 'Electronics', 'Fashion', 'Footwear', 'Accessories', 'Home', 'Fitness'];

  useEffect(() => {
    fetchProducts();
  }, [keyword, selectedCategory]);

  const fetchProducts = async () => {
    try {
      let url = `http://localhost:5000/api/products?keyword=${keyword}`;
      if (selectedCategory !== 'All') {
        url += `&category=${selectedCategory}`;
      }
      const { data } = await axios.get(url);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = async (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existItem = cart.find((x) => x.product === product._id);

    if (existItem) {
      existItem.quantity += 1;
    } else {
      cart.push({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    if (user && user.token) {
      try {
        await axios.post(
          'http://localhost:5000/api/cart',
          {
            productId: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: existItem ? existItem.quantity : 1,
          },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
      } catch (err) {
        console.error('Failed to sync cart with database:', err);
      }
    }

    alert(`${product.name} added to cart!`);
    navigate('/cart');
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h2>Products Catalog</h2>

      {/* Search and Category Filter Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', margin: '1.5rem 0', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ flex: '1 1 250px', padding: '0.7rem', borderRadius: '6px' }}
        />

        {/* Category Filter Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: selectedCategory === cat ? '#0d6efd' : 'rgba(255, 255, 255, 0.9)',
                color: selectedCategory === cat ? '#fff' : '#333',
                border: '1px solid #ccc',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: selectedCategory === cat ? 'bold' : 'normal',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {products.length === 0 ? (
          <p style={{ color: '#fff', fontSize: '1.1rem' }}>No products found in this category.</p>
        ) : (
          products.map((p) => (
            <div key={p._id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    borderRadius: '6px'
                  }}
                />
                <h3 style={{ fontSize: '1.1rem', margin: '0.8rem 0 0.4rem 0' }}>{p.name}</h3>
                <p style={{ color: '#0d6efd', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  ${p.price.toFixed(2)}
                </p>
                <span style={{ fontSize: '0.85rem', background: '#e9ecef', padding: '0.2rem 0.6rem', borderRadius: '4px', color: '#495057' }}>
                  {p.category}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <Link to={`/product/${p._id}`} style={{ flex: 1 }}>
                  <button style={{ width: '100%', background: '#6c757d' }}>Details</button>
                </Link>
                <button style={{ flex: 1 }} onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}