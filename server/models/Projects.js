const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
  influencerName: {
    type: String,
<<<<<<< HEAD
    required: false,
=======
    required: true,
>>>>>>> bab79005b245b57974848f870e25ed8ad0214814
  },
  influencerID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  businessName: {
    type: String,
<<<<<<< HEAD
    required: false,
  },
  businessId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  projectName: {
    type: String,
    require: true,
=======
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
>>>>>>> bab79005b245b57974848f870e25ed8ad0214814
  },
  projectDescription: {
    type: String,
    required: true,
  },
  projectStartDate: {
    type: String,
<<<<<<< HEAD
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
=======
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
>>>>>>> bab79005b245b57974848f870e25ed8ad0214814
});

module.exports = ProjectModule = mongoose.model("addprojects", ProjectSchema);
