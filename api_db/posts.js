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

module.exports = router;
