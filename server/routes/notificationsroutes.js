const express = require("express");
const { Notification } = require("../models/notifications");
const router = express.Router();

//save project notifications
router.post("/createProjectNotification", (req, res) => {
  let newNotification = new Notification(req.body);
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
router.post("/createEventNotification", (req, res) => {
  let newNotification = new Notification(req.body);
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

router.post("/notificationDeleteProject", (req, res) => {
  let newNotification = new Notification(req.body);
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
  let newNotification = new Notification(req.body);
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
  let newNotification = new Notification(req.body);
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
  let newNotification = new Notification(req.body);
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
  let newNotification = new Notification(req.body);
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
  Notification.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

//get a specific notification
router.get("/notification/:id", (req, res) => {
  let notificationID = req.params.id;
  Notification.findById(notificationID, (err, notification) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      notification,
    });
  });
});

router.put("/notifications/update/:id", (req, res) => {
  Notification.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
      Seen: true,
    },
    (err, notification) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({ success: "Updated Successfully" });
    }
  );
});

module.exports = router;
