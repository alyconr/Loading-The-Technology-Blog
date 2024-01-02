const express = require("express");
const router = express.Router();


const { createComment, getComments, deleteComment  } = require("../controllers/comments");

router.route("/:id").post(createComment).get(getComments);
router.route("/postId/:id").delete(deleteComment);




module.exports = router;