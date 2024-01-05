const express = require("express");

const router = express.Router();

const {
  createCommentsOnComment,
  getCommentsOnComments,
} = require("../controllers/commentsOnComment");

router.route("/:id").post(createCommentsOnComment).get(getCommentsOnComments);

module.exports = router;
