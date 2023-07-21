const mongoose = require("mongoose");

const tvSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      
      tvId: {
        type: String,
        required: true,
      },
      name: { type: String, required: true },
      overview: { type: String, required: true },
      poster_path: { type: String },
      vote_average: { type: Number },
      genre_ids: [{ type: Number }],
    },
    { timestamps: true }
  );
  
module.exports = mongoose.model("Tv", tvSchema);