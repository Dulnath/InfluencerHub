const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  InvolvedInfluencerName: {
    type: String,
    required: true,
  },
  InvolvedBusinessName: {
    type: String,
    required: true,
  },
  Eventhappened: {
    type: String,
    required: true,
  },
  Notificationmessage: {
    type: String,
    required: true,
  },
  Seen: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Notification", NotificationSchema);
