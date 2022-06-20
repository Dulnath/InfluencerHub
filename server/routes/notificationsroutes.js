const express = require("express");
const { Notification } = require("../models/notifications");
const router = express.Router();

//save notifications
router.post("/createNotification", (req, res) => {
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

//update a notification as read
router.put("/notification/update/:id", (req, res) => {
  Notification.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
      Seen: true,
    },
    (err, Notification) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({ success: "Updated Successfully" });
    }
  );
});

router.delete("/notification/delete/:id", (req, res) => {
  Notification.findByIdAndRemove(req.params.id).exec(
    (err, deletedNotification) => {
      if (err) {
        return res.status(400).json({
          message: "Delete unsuccessful",
          err,
        });
      }
      return res.json({
        message: "Delete successful",
        deletedNotification,
      });
    }
  );
});

module.exports = router;
