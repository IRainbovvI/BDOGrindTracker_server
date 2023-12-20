const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  items: [{ type: Number, ref: 'Item', required: true }]
});

module.exports = Location = mongoose.model('Location', LocationSchema);
