const Favorite = require('../models/Favorite');

// Retrieve Favorites
const getFavorites = async (req, res) => {
  const { category } = req.params;
  const { limit = 5, offset = 0 } = req.query;

  try {
    const favorites = await Favorite.find({ category })
      .skip(offset)
      .limit(limit);

    res.status(200).json({
      status: 200,
      data: favorites,
      message: 'Favorites retrieved successfully.',
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

// Add a Favorite
const addFavorite = async (req, res) => {
  const { category, item_id } = req.body;

  try {
    const newFavorite = new Favorite({ category, item_id });
    await newFavorite.save();

    res.status(201).json({
      status: 201,
      data: null,
      message: 'Favorite added successfully.',
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

// Remove a Favorite
const removeFavorite = async (req, res) => {
  const { id } = req.params;

  try {
    const favorite = await Favorite.findByIdAndDelete(id);

    if (!favorite) {
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
      message: 'Favorite removed successfully.',
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

module.exports = { getFavorites, addFavorite, removeFavorite };
