const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  artist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  album_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true },
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  hidden: { type: Boolean, default: false },
});

module.exports = mongoose.model('Track', trackSchema);
