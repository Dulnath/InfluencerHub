const express = require("express");
const Notifications = require("../models/Notification");
const router = express.Router();

//save notifications
router.post("/notification/save", (req, res) => {
  let newNotification = new Notifications(req.body);
  newNotification.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Notification saved successfully",
    });
  });
});

/*router.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});*/

//retrieve notifications
router.get("/notifications", (req, res) => {
  Notifications.find().exec((err, notifications) => {
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
  Notifications.findById(notificationID, (err, notification) => {
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
