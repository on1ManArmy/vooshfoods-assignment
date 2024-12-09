const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  artist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  name: { type: String, required: true },
  year: { type: Number, required: true },
  hidden: { type: Boolean, default: false },
});

module.exports = mongoose.model('Album', albumSchema);
