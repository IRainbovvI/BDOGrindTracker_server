const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: Number, ref: 'Location', required: true },
    hours: { type: Number, required: true },
    minutes: { type: Number, required: true },
    agris: { type: Number },
    silver_total: { type: Number, required: true },
    char_class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Char_Class',
      required: true
    },
    buffs: [{ type: Number, ref: 'Buff' }],
    items: [
      {
        id: { type: Number, ref: 'Item', required: true },
        amount: { type: Number, required: true }
      }
    ]
  },
  { timestamps: true }
);

module.exports = Session = mongoose.model('Session', SessionSchema);
