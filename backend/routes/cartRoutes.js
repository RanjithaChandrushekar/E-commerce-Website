const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product'); // Import Product model
const { protect } = require('../middleware/authMiddleware');

// Get logged-in user's cart
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, cartItems: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add or update an item in the cart
router.post('/', protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Fetch product from DB to securely get name, price, image
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, cartItems: [] });
    }

    const itemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // If item already exists in cart, update quantity
      cart.cartItems[itemIndex].quantity = quantity;
    } else {
      // Otherwise, push new item with data fetched securely from DB
      cart.cartItems.push({
        product: productId,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: quantity || 1
      });
    }

    const updatedCart = await cart.save();
    res.status(201).json(updatedCart);
  } catch (error) {
    console.error("Cart POST Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Remove an item from the cart
router.delete('/:productId', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.cartItems = cart.cartItems.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;