const express = require("express");
const router = express.Router();

const {
  getAllDraftPosts,
  createDraftPost,
} = require("../controllers/draft.post");

router.route("/").get(getAllDraftPosts).post(createDraftPost); 

module.exports = router;
