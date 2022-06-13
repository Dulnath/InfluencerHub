const express = require("express");
const Posts = require("../models/posts");
const router = express.Router();

//save posts
router.post("/post/save", (req, res) => {
  let newPost = new Posts(req.body);
  newPost.save((err, post) => {
    //console.log(post._id);
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Posts saved successfully",
    });
  });
});

//retrieve all posts
router.get("/posts/:id", (req, res) => {
  Posts.find({PostAuthorID:req.params.id}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

//get a specific post
router.get("/post/:id", (req, res) => {
  let postID = req.params.id;
  Posts.findById(postID, (err, post) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      post,
    });
  });
});

//update post
router.put("/post/update/:id", (req, res) => {
  Posts.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({ success: "Updated Successfully" });
    }
  );
});

//delete post
router.delete("/post/delete/:id", (req, res) => {
  Posts.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
    if (err) {
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    }
    return res.json({
      message: "Delete successful",
      deletedPost,
    });
  });
});

module.exports = router;
