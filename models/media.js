const mongoose = require("mongoose");

const media = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    description :String,
    image: String,
})

module.exports = mongoose.model("Media", media);