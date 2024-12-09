const Track = require('../models/Track');

// Retrieve All Tracks
const getTracks = async (req, res) => {
  const { limit = 5, offset = 0, artist_id, album_id, hidden } = req.query;

  try {
    const filter = {};
    if (artist_id) filter.artist_id = artist_id;
    if (album_id) filter.album_id = album_id;
    if (hidden !== undefined) filter.hidden = hidden === 'true';

    const tracks = await Track.find(filter).skip(offset).limit(limit);

    res.status(200).json({
      status: 200,
      data: tracks,
      message: 'Tracks retrieved successfully.',
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

// Retrieve a Single Track by ID
const getTrackById = async (req, res) => {
  const { id } = req.params;

  try {
    const track = await Track.findById(id);

    if (!track) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Resource doesn\'t exist.',
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: track,
      message: 'Track retrieved successfully.',
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

// Add a New Track
const addTrack = async (req, res) => {
  const { artist_id, album_id, name, duration, hidden } = req.body;

  try {
    const newTrack = new Track({ artist_id, album_id, name, duration, hidden });
    await newTrack.save();

    res.status(201).json({
      status: 201,
      data: null,
      message: 'Track created successfully.',
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

// Update a Track
const updateTrack = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
  
    try {
      const track = await Track.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!track) {
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
  
  // Delete a Track
  const deleteTrack = async (req, res) => {
    const { id } = req.params;
  
    try {
      const track = await Track.findByIdAndDelete(id);
  
      if (!track) {
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
        message: `Track: ${track.name} deleted successfully.`,
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
  

module.exports = { updateTrack, deleteTrack, getTracks, getTrackById, addTrack };
