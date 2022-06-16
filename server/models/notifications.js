const mongoose = require("mongoose");
const NotificationSchema = new mongoose.Schema(
  {
    SenderId: {
      type: String,
      required: true,
    },
    ReceiverId: {
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", NotificationSchema);
