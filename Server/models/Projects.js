const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
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
        require: true,
    },
    projectDescription: {
        type: String,
        required: true,
    },
    projectStartDate: {
        type: String,
        required: false,
    },
    projectEndDate: {
        type: String,
        required: false,
    },
    influencerEmail: {
        type: String,
        required: false,
    },
    businessEmail: {
        type: String,
        required: false,
    }
});

module.exports = ProjectModule = mongoose.model("addprojects", ProjectSchema);