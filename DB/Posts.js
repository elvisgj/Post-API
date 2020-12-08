const mongoose = require("mongoose");

const post = new mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  post: {
    type: String,
  },
});

module.exports = Post = mongoose.model("post", post);
