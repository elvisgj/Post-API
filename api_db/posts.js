const express = require("express");
const Post = require("../DB/Posts");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { errorWrapper } = require("../errors");

//Make a new post
router.post(
  "/",
  [
    body("name", "Please eneter a valid name").isLength({ min: 2 }).isString(),

    body("surname", "Please eneter a valid surname")
      .isLength({ min: 2 })
      .isString(),

    body("post", "The post must be min 20 characters and max 140")
      .isLength({ min: 20, max: 140 })
      .isString(),
  ],
  errorWrapper(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json({ post: newPost });
  })
);

//Get all the posts
router.get(
  "/",
  errorWrapper(async (req, res) => {
    const filter = {};
    if (req.query.name) {
      filter.name = { $regex: new RegExp(req.query.name), $options: "i" };
    }
    if (req.query.surname) {
      filter.surname = { $regex: new RegExp(req.query.surname), $options: "i" };
    }

    const posts = await Post.find(filter);
    res.json(posts);
  })
);

//Get post by id
router.get(
  "/:postId",
  errorWrapper(async (req, res) => {
    const posts = await Post.findById(req.params.postId);
    if (!posts) {
      res
        .status(404)
        .json({ msg: `Post with id: ${req.params.postId} it is not found` });
      return;
    }
    res.json(posts);
  })
);

//Delete a post
router.delete(
  "/:postId",
  errorWrapper(async (req, res) => {
    const result = await Post.remove({ _id: req.params.postId });
    if (result.deletedCount === 0) {
      res
        .status(404)
        .json({ msg: `Post with id: ${req.params.postId} does not exist` });
      return;
    }
    res.json({ msg: "Post deleted successfully" });
  })
);

module.exports = router;
