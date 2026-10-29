const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
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
    const { productId, name, image, price, quantity } = req.body;
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
      // Otherwise, push new item
      cart.cartItems.push({ product: productId, name, image, price, quantity });
    }

    const updatedCart = await cart.save();
    res.status(201).json(updatedCart);
  } catch (error) {
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