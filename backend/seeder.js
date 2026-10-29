const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const sampleProducts = [
  // Electronics
  {
    name: 'Wireless Bluetooth Headphones',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
    description: 'High-quality sound with active noise-canceling technology and long battery life.',
    category: 'Electronics',
    price: 99.99,
    stock: 15,
  },
  {
    name: 'Smart Watch Series 5',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500',
    description: 'Track your fitness, heart rate, and notifications on the go.',
    category: 'Electronics',
    price: 199.99,
    stock: 10,
  },
  {
    name: 'Ergonomic Gaming Mouse',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500',
    description: 'Precision tracking with customizable RGB lighting and ergonomic grip.',
    category: 'Electronics',
    price: 49.99,
    stock: 25,
  },
  {
    name: 'Mechanical Gaming Keyboard',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500',
    description: 'Tactile mechanical switches with per-key RGB backlighting.',
    category: 'Electronics',
    price: 129.99,
    stock: 12,
  },
  {
    name: 'Ultra HD 4K Monitor',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500',
    description: 'Stunning crystal-clear resolution with HDR support and ultra-thin bezels.',
    category: 'Electronics',
    price: 349.99,
    stock: 8,
  },
  {
    name: 'Portable Bluetooth Speaker',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500',
    description: 'Waterproof outdoor speaker with deep bass and 12-hour playtime.',
    category: 'Electronics',
    price: 59.99,
    stock: 20,
  },
  {
    name: 'Professional DSLR Camera',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500',
    description: 'Capture stunning photos and 4K videos with interchangeable lenses.',
    category: 'Electronics',
    price: 799.99,
    stock: 5,
  },
  {
    name: 'Fast Desktop Charger',
    image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=500', // Updated name & verified image
    description: 'Multi-port fast wall charger for all your electronic devices.',
    category: 'Electronics',
    price: 29.99,
    stock: 30,
  },

  // Fashion
  {
    name: 'Classic Leather Backpack',
    image: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=500',
    description: 'Durable, stylish leather backpack perfect for work, school, or travel.',
    category: 'Fashion',
    price: 79.99,
    stock: 20,
  },
  {
    name: 'Minimalist Analog Watch',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500',
    description: 'Sleek design featuring a genuine leather strap and stainless steel case.',
    category: 'Fashion',
    price: 119.99,
    stock: 18,
  },
  {
    name: 'Casual Denim Jacket',
    image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=500',
    description: 'Classic vintage-wash denim jacket suitable for all seasons.',
    category: 'Fashion',
    price: 69.99,
    stock: 22,
  },
  {
    name: 'Cotton Graphic T-Shirt',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
    description: '100% organic cotton casual crewneck tee with unique graphic design.',
    category: 'Fashion',
    price: 29.99,
    stock: 40,
  },
  {
    name: 'Slim Fit Chino Pants',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500', // FIXED
    description: 'Comfortable stretch-cotton casual chinos for everyday wear.',
    category: 'Fashion',
    price: 49.99,
    stock: 25,
  },

  // Footwear
  {
    name: 'Running Sports Shoes',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500',
    description: 'Lightweight, breathable athletic footwear designed for maximum comfort.',
    category: 'Footwear',
    price: 89.99,
    stock: 30,
  },
  {
    name: 'Classic Casual Sneakers',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500',
    description: 'Versatile canvas low-top sneakers matching any casual wardrobe.',
    category: 'Footwear',
    price: 54.99,
    stock: 35,
  },
  {
    name: 'Leather Formal Brogues',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500',
    description: 'Handcrafted leather dress shoes for formal events and business wear.',
    category: 'Footwear',
    price: 139.99,
    stock: 12,
  },

  // Accessories
  {
    name: 'Polarized Sunglasses',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    description: 'UV400 protection lenses with a durable lightweight frame.',
    category: 'Accessories',
    price: 45.00,
    stock: 35,
  },
  {
    name: 'Leather Executive Wallet',
    image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?w=500',
    description: 'Slim bifold wallet made from genuine full-grain leather with RFID blocking.',
    category: 'Accessories',
    price: 34.99,
    stock: 25,
  },
  {
    name: 'Designer Silk Necktie',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=500',
    description: 'Premium woven silk tie with classic patterned finish for business attire.',
    category: 'Accessories',
    price: 29.99,
    stock: 20,
  },

  // Home
  {
    name: 'Modern Desk Lamp',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500',
    description: 'Dimmable LED desk lamp with adjustable color temperatures and USB charging port.',
    category: 'Home',
    price: 39.99,
    stock: 15,
  },
  {
    name: 'Ceramic Coffee Mug',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500',
    description: 'Handcrafted 12oz ceramic coffee mug with comfortable grip handle.',
    category: 'Home',
    price: 15.99,
    stock: 60,
  },
  {
    name: 'Aromatherapy Essential Oil Diffuser',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=500',
    description: 'Ultrasonic humidifier with ambient LED lighting for relaxation and wellness.',
    category: 'Home',
    price: 32.99,
    stock: 22,
  },

  // Fitness
  {
    name: 'Fitness Resistance Bands Set',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500',
    description: 'Set of 5 stackable workout bands for strength training and physical therapy.',
    category: 'Fitness',
    price: 21.99,
    stock: 40,
  },
  {
    name: 'Non-Slip Yoga Mat',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
    description: 'Eco-friendly extra thick cushion yoga mat with alignment markers.',
    category: 'Fitness',
    price: 35.99,
    stock: 28,
  },
  {
    name: 'Adjustable Dumbbell Set',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
    description: 'Space-saving adjustable weight dumbbells for home gym strength workouts.',
    category: 'Fitness',
    price: 149.99,
    stock: 10,
  },
  {
    name: 'Stainless Steel Water Bottle',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500',
    description: 'Double-wall vacuum insulated bottle keeps drinks cold for 24 hours.',
    category: 'Fitness',
    price: 24.99,
    stock: 50,
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log('All Products with New Alternative Images Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();