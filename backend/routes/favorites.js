const express = require("express");
const router = express.Router();
const Favorites = require("../models/favorites");
const Tv = require("../models/tv");
const User = require("../models/User");

router.post("/add", async (req, res) => {
  try {
    const { userId, vote_average, movieId, title, description, poster_path, duration, genre_ids } = req.body;

    // Check if the movie with the same movieId exists in favorites
    const existingFavorite = await Favorites.findOne({ movieId: movieId });

    if (existingFavorite) {
      return res.status(409).json({ error: "Movie already in favorites" });
    }

    // If the movie doesn't exist in favorites, add it
    const newFavorite = new Favorites({
      userId,
      movieId,
      title,
      description,
      poster_path,
      duration,
      genre_ids,
      vote_average,
    });

    const savedFavorite = await newFavorite.save();

    res.status(200).json(savedFavorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/addtv", async (req, res) => {
  try {
    const { userId, vote_average, tvId, name, overview, poster_path, genre_ids } = req.body;
    console.log(req.body);
    // Check if the TV show with the same tvId exists in favorites
    const existingFavorite = await Favorites.findOne({ tvId: tvId });

    // Check if the TV show with the same tvId exists in the "Tv" model
    const existingTv = await Tv.findOne({ tvId: tvId });

    if (existingFavorite || existingTv) {
      return res.status(409).json({ error: "TV show already in favorites" });
    }

    // If the TV show doesn't exist in favorites, add it
    const newFavorite = new Favorites({
      userId,
      tvId,
      name,
      overview,
      poster_path,
      genre_ids,
      vote_average,
    });

    const savedFavorite = await newFavorite.save();

    res.status(200).json(savedFavorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const favorites = await Favorites.find({ userId: req.params.userId });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Failed to find user's favorites" });
  }
});

router.delete("/delete/:favoriteId", async (req, res) => {
  try {
    const deletedFavorite = await Favorites.findByIdAndDelete(req.params.favoriteId);
    if (!deletedFavorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }
    res.status(200).json(deletedFavorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete favorite" });
  }
});

module.exports = router;
