const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    influencerName: {
        type: String,
        required: false,
    },
    businessName: {
        type: String,
        required: false,
    },
    projectName: {
        type: String,
        require: false,
    },
    eventName:{
        type: String,
        require: true,
    },
    eventDescription: {
        type: String,
        required: true,
    },
    eventStartDate: {
        type: String,
        required: false,
    },
    eventEndDate: {
        type: String,
        required: false,
    }
});

module.exports = EventModule = mongoose.model("addevents", EventSchema);