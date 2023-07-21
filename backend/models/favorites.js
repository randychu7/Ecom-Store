const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      
      movieId: {
        type: String,
        required: true,
      },
      title: { type: String, required: true },
      description: { type: String, required: true },
      poster_path: { type: String },
      duration: { type: String },
      vote_average: { type: Number },
      genre_ids: [{ type: Number }],
    },
    { timestamps: true }
  );
  
module.exports = mongoose.model("Favorites", favoritesSchema);
