const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS
const BasketItem = require('./BasketItem'); // Import the schema

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());  // Allow all origins to access this server

app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Route to add item to basket
app.post('/add-to-basket', async (req, res) => {
  try {
    const { id, name, price, quantity, type } = req.body;

    // Check if item already exists in basket
    let item = await BasketItem.findOne({ id, type });
    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = new BasketItem({ id, name, price, quantity, type });
      await item.save();
    }

    res.status(201).json({ message: 'Item added to basket', item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to basket' });
  }
});

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
