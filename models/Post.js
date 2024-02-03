const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: "string",
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
