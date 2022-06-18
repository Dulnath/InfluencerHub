const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new mongoose.Schema({
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
  projectName: {
    type: String,
    require: true,
  },
  eventName: {
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
  },
});

module.exports = EventModule = mongoose.model("addevents", EventSchema);
