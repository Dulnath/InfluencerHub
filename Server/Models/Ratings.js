const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    rater: {
        type: String,
        required: false,
    },
    influencerName: {
        type: String,
        required: false,
    },
    businessName: {
        type: String,
        required: false,
    },
    rating: {
        type: Number,
        required: true,
    }
});

module.exports = RatingsModule = mongoose.model("addratings", RatingSchema);