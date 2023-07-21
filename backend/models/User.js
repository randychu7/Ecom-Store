const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    favorites: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Favorites" },
        { type: mongoose.Schema.Types.ObjectId, ref: "Tv" }
    
    ]
}, { timestamps: true });

module.exports = mongoose.model("Users", UserSchema);
