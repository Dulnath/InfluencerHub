const mongoose = require("mongoose");
//const Schema = mongoose.Schema;
const NotificationSchema = new mongoose.Schema(
  {
    InvolvedInfluencerId: {
      type: String,
      required: true,
    },
    InvolvedBusinessId: {
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
      default: false,
    },
    isAccepted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", NotificationSchema);
