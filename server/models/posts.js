const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  PostAuthor: {
    type: String,
    required: false,
  },
  PostAuthorID:{
    type:Schema.Types.ObjectId,
    required:false,
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
