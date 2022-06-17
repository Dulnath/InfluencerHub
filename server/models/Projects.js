const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
  influencerName: {
    type: String,
    required: true,
  },
  influencerID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  businessID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
    unique: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  projectStartDate: {
    type: String,
    required: true,
  },
  projectEndDate: {
    type: String,
    required: true,
  },
  isAccepted: {
    type: String,
    required: false,
    default: null,
  }
});

module.exports = ProjectModule = mongoose.model("addprojects", ProjectSchema);