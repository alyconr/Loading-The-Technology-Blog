const express = require("express");
const router = express.Router();

const {
  getAllDraftPosts,
  createDraftPost,
  updateDraftPost,
} = require("../controllers/draft.post");

router.route("/").get(getAllDraftPosts).post(createDraftPost);
router.route("/:id").put(updateDraftPost);

module.exports = router;
