const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
  influencerName: {
    type: String,
    required: false,
  },
  influencerID: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  businessName: {
    type: String,
    required: false,
  },
  businessId: {
    type: Schema.Types.ObjectId,
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
  },
});

module.exports = ProjectModule = mongoose.model("addprojects", ProjectSchema);
