import React, { useState, useEffect } from 'react';
import API from '../api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to handle Add to Cart
  const addToCart = async (productId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo) {
        alert('Please login first to add items to your cart!');
        return;
      }

      await API.post(
        '/cart',
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setMessage('Product added to cart successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Electronics', 'Fashion', 'Footwear', 'Accessories', 'Home', 'Fitness'];

  return (
    <div className="min-h-screen px-4 py-8 max-w-7xl mx-auto">
      {message && (
        <div className="mb-4 p-3 bg-green-500 text-white rounded-lg text-center font-medium shadow">
          {message}
        </div>
      )}

      {/* Search Bar & Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 shadow-sm"
        />

        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center py-20 text-xl text-gray-700 font-medium">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-xl text-gray-700 font-medium">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-full h-52 bg-gray-50 flex items-center justify-center overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500';
                  }}
                />
              </div>

              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mt-1 line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-gray-900">${product.price}</span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="px-3.5 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;