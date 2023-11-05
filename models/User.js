const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = User = mongoose.model('User', UserSchema);
