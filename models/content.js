const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
    name: String,
    description: String,
    terms: String,
    privacy: String,
    logo: String,
    socialLinks:[{
        facebook: String,
        instagram: String,
        linkedin: String,
        twitter: String,
        behance: String,
        dribbble: String,
    }],
    testimonials: [{
        avatar: String,
        name:String,
        designation: String,
        rating: Number,
        reveiws: String,
        email: String,
    }]

})

module.exports = mongoose.model("Content", contentSchema);



