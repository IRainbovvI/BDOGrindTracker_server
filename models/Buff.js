const mongoose = require('mongoose');

const BuffSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  logo: { type: String, required: true },
  name: { type: String, required: true },
  drop_rate: { type: Number },
  drop_amount: { type: Number },
  buff_group: { type: String, required: true }
});

module.exports = Buff = mongoose.model('Buff', BuffSchema);
