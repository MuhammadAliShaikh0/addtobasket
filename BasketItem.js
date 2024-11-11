const mongoose = require('mongoose');

const basketItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  type: { type: String, required: true }
});

module.exports = mongoose.model('BasketItem', basketItemSchema);
