const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Forces Node to use Google's DNS

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes'); // <-- Import cart routes
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Register Routes
app.use('/api/users', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);     // <-- Use cart routes
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));