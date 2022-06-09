const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  PostAuthor: {
    type: String,
    required: false,
  },
  PostTopic: {
    type: String,
    required: true,
  },
  Postdescription: {
    type: String,
    required: true,
  },
  PostImage: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Posts", postSchema);
