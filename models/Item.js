const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  logo: { type: String, required: true },
  name: { type: String, required: true },
  weight: { type: String },
  sellPrice: { type: Number },
  type: { type: String }
});

module.exports = Item = mongoose.model('Item', ItemSchema);
