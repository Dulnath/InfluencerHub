// const mongoose = require('mongoose');

// const EventSchema = new mongoose.Schema({
//     businessName: {
//         type: String,
//         required: false,
//     },

//     influencerName: {
//         type: String,
//         required: false,
//     },

//     projectName : {
//         type: String,
//         required: false,
//     },

//     eventName: {
//         type: String,
//         required: true,
//     },

//     eventDescription: {
//         type: String,
//         required: true,
//     },

//     eventStartDate: {
//         type: Date,
//         required: true,
//     },

//     eventEndDate: {
//         type: Date,
//         required: true,
//     },

// });

// mongoose.exports = EventsModule = mongoose.model("addevents",EventSchema);

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
        type: Date,
        required: false,
    },
    eventEndDate: {
        type: Date,
        required: false,
    },
});

module.exports = EventModule = mongoose.model("addevents", EventSchema);