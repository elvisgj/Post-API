const mongoose = require("mongoose");

const post = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name it's required, please enter one"],
    minlength: [2, "The name must be at least 2 characters"],
  },
  surname: {
    type: String,
    required: [true, "Surname it's required, please enter one"],
    minlength: 2,
  },
  post: {
    type: String,
    required: [true, "Post it's required, please enter one"],
    maxlength: [140, "The post can't be more then 140 characters"],
  },
});

module.exports = Post = mongoose.model("post", post);
