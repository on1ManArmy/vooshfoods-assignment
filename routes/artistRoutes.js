const express = require('express');
const { getArtists, getArtist, addArtist } = require('../controllers/artistController');
const authMiddleware = require('../middleware/authMiddleware');
const {
    updateArtist,
    deleteArtist,
  } = require('../controllers/artistController');
const router = express.Router();

router.get('/', authMiddleware, getArtists);
router.get('/:id', authMiddleware, getArtist);
router.post('/add-artist', authMiddleware, addArtist);
router.put('/:id', authMiddleware, updateArtist);
router.delete('/:id', authMiddleware, deleteArtist);

module.exports = router;
