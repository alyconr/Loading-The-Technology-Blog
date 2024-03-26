const express = require("express");
const router = express.Router();

const { createBookmark, getAllBookmarks, deleteBookmark } = require("../controllers/bookmarks");

router.route("/").post(createBookmark).get(getAllBookmarks);
router.route("/:id").delete(deleteBookmark);

module.exports = router;
