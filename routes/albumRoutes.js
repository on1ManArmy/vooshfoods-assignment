const express = require('express');
const {
  getAlbums,
  getAlbumById,
  addAlbum,
} = require('../controllers/albumController');
const authMiddleware = require('../middleware/authMiddleware');
const {
    updateAlbum,
    deleteAlbum,
  } = require('../controllers/albumController');
  
const router = express.Router();

router.get('/', authMiddleware, getAlbums);
router.get('/:id', authMiddleware, getAlbumById);
router.post('/add-album', authMiddleware, addAlbum);
router.put('/:id', authMiddleware, updateAlbum);
router.delete('/:id', authMiddleware, deleteAlbum);

module.exports = router;
