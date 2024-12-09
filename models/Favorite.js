const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['artist', 'album', 'track'],
    required: true,
  },
  item_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Favorite', favoriteSchema);
