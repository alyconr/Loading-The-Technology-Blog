const express = require("express");
const router = express.Router();

const { createBookmark, getAllBookmarks } = require("../controllers/bookmarks");

router.route("/").post(createBookmark).get(getAllBookmarks);

module.exports = router;
