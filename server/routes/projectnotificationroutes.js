const express = require("express");
const projectnotification = require("../models/notifications");
const router = express.Router();

//save project notifications
router.post("/createProject", (req, res) => {
  let newNotification = new projectnotification(req.body);
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
  projectnotification.find().exec((err, notifications) => {
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
  projectnotification.findById(notificationID, (err, notification) => {
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
