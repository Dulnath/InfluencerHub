const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  PostAuthor: {
    type: String,
    required: false,
  },
  PostAuthorID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  PostTopic: {
    type: String,
    required: true,
    trim: true,
  },
  Postdescription: {
    type: String,
    required: true,
    trim: true,
  },
  PostCategory: {
    type: String,
    required: false,
    trim: true,
  },
  PostImage: {
    type: String,
    required: false,
  },
});
module.exports = mongoose.model("Posts", postSchema);
