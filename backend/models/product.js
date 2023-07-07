const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    image:{type: String, required: true},
    desc:{type: String, required: true},
    categories:{type: Array},
    size:{type: String},
    price:{type: Number, required: true},
    color:{type: String},
    
}, {timestamps: true}
);

module.exports = mongoose.model("Products", ProductSchema)