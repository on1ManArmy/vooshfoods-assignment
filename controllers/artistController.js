const Artist = require('../models/Artist');

const getArtists = async (req, res) => {
  const { limit = 5, offset = 0, grammy, hidden } = req.query;

  try {
    const query = {};
    if (grammy !== undefined) query.grammy = Number(grammy);
    if (hidden !== undefined) query.hidden = hidden === 'true';

    const artists = await Artist.find(query)
      .skip(Number(offset))
      .limit(Number(limit));

    res.status(200).json({
      status: 200,
      data: artists,
      message: "Artists retrieved successfully.",
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: error.message,
    });
  }
};

const getArtist = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch artist
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Artist not found.",
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: artist,
      message: "Artist retrieved successfully.",
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: error.message,
    });
  }
};

const addArtist = async (req, res) => {
  const { name, grammy, hidden } = req.body;

  if (!name || grammy === undefined || hidden === undefined) {
    return res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request, Reason: Missing Field(s)",
      error: null,
    });
  }

  try {
    // Create new artist
    const artist = new Artist({ name, grammy, hidden });
    await artist.save();

    res.status(201).json({
      status: 201,
      data: null,
      message: "Artist created successfully.",
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: error.message,
    });
  }
};

// Update an Artist
const updateArtist = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const artist = await Artist.findByIdAndUpdate(id, updateData, { new: true });

    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Artist not found.',
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

// Delete an Artist
const deleteArtist = async (req, res) => {
  const { id } = req.params;

  try {
    const artist = await Artist.findByIdAndDelete(id);

    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Artist not found.',
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: { artist_id: id },
      message: `Artist: ${artist.name} deleted successfully.`,
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

module.exports = { updateArtist, deleteArtist, addArtist, getArtists, getArtist };
