const Album = require('../models/Album');

// Retrieve All Albums
const getAlbums = async (req, res) => {
  const { limit = 5, offset = 0, artist_id, hidden } = req.query;

  try {
    const filter = {};
    if (artist_id) filter.artist_id = artist_id;
    if (hidden !== undefined) filter.hidden = hidden === 'true';

    const albums = await Album.find(filter).skip(offset).limit(limit);

    res.status(200).json({
      status: 200,
      data: albums,
      message: 'Albums retrieved successfully.',
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message,
    });
  }
};

// Retrieve an Album by ID
const getAlbumById = async (req, res) => {
  const { id } = req.params;

  try {
    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Resource doesn\'t exist.',
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: album,
      message: 'Album retrieved successfully.',
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message,
    });
  }
};

// Add a New Album
const addAlbum = async (req, res) => {
  const { artist_id, name, year, hidden } = req.body;

  try {
    const newAlbum = new Album({ artist_id, name, year, hidden });
    await newAlbum.save();

    res.status(201).json({
      status: 201,
      data: null,
      message: 'Album created successfully.',
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message,
    });
  }
};

// Update an Album
const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const album = await Album.findByIdAndUpdate(id, updateData, { new: true });

    if (!album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Resource doesn\'t exist.',
        error: null,
      });
    }

    res.status(204).send(); // No content response
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message,
    });
  }
};

// Delete an Album
const deleteAlbum = async (req, res) => {
  const { id } = req.params;

  try {
    const album = await Album.findByIdAndDelete(id);

    if (!album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Resource doesn\'t exist.',
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: `Album: ${album.name} deleted successfully.`,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message,
    });
  }
};


module.exports = { updateAlbum, deleteAlbum, getAlbums, getAlbumById, addAlbum };
