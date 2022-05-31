const express = require("express");
const eventnotification = require("../models/notifications");
const router = express.Router();

//save event notifications
router.post("/createEvent", (req, res) => {
  let newNotification = new eventnotification(req.body);
  newNotification.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Notification saved successfully",
    });
  });
});

//retrieve notifications
router.get("/notifications", (req, res) => {
  eventnotification.find().exec((err, notifications) => {
    if (err) {
      res.status(400).json({ error: err });
    }
    return res.status(200).json({
      success: true,
      existingNotifications: notifications,
    });
  });
});

//get a specific notification
router.get("/notification/:id", (req, res) => {
  let notificationID = req.params.id;
  eventnotification.findById(notificationID, (err, notification) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      notification,
    });
  });
});

module.exports = router;
