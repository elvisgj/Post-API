const express = require("express");
const posts = require("../DB/Posts");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, surname, post } = req.body;
  let newPost = {};
  newPost.name = name;
  newPost.surname = surname;
  newPost.post = post;
  let postModel = new posts(newPost);
  await postModel.save();
  res.json({ msg: "Your post is registered", postDetails: postModel });
});

module.exports = router;
