const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all products (with search & filters)
router.get('/', async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};
    const category = req.query.category ? { category: req.query.category } : {};
    
    const products = await Product.find({ ...keyword, ...category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a product (Admin)
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;
    const product = new Product({ name, description, price, image, category, stock });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;