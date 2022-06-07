const express = require("express");
const notification = require("../models/notifications");
const router = express.Router();

//save project notifications
router.post("/createProject", (req, res) => {
  let newNotification = new notification(req.body);
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

//save event notifications
router.post("/createEvent", (req, res) => {
  let newNotification = new notification(req.body);
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

//save notification when dates of a project is changed
router.post("/updateProject", (req, res) => {
  let newNotification = new notification(req.body);
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

//save notification when dates of a event is changed
router.post("/updateEvent", (req, res) => {
  let newNotification = new notification(req.body);
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

//save notification when a Business makes a payment to an influencer
router.post("/makepayment", (req, res) => {
  let newNotification = new notification(req.body);
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

//save notification when a Business requests a payment refund from an influencer
router.post("/requestrefund", (req, res) => {
  let newNotification = new notification(req.body);
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
  notification.find().exec((err, notifications) => {
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
  notification.findById(notificationID, (err, notification) => {
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
