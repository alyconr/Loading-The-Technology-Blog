const express = require("express");
const router = express.Router();

const {
  getAllDraftPosts,
  createDraftPost,
  updateDraftPost,
  getSingleDraftPost,
  deleteDraftPost
} = require("../controllers/draft.post");

router.route("/").get(getAllDraftPosts).post(createDraftPost);
router.route("/:id").put(updateDraftPost).get(getSingleDraftPost).delete(deleteDraftPost);

module.exports = router;
