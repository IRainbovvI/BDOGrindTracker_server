const mongoose = require('mongoose');

const Char_ClassSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  logo: { type: String, required: true }
});

module.exports = Char_Class = mongoose.model('Char_Class', Char_ClassSchema);
