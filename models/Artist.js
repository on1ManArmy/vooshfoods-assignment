const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grammy: { type: Number, default: 0 },
  hidden: { type: Boolean, default: false },
});

module.exports = mongoose.model('Artist', artistSchema);
