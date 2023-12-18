const express = require("express");
const router = express.Router();


const { createComment, getComments  } = require("../controllers/comments");

router.route("/:id").post(createComment);
router.route("/:id").get(getComments);


module.exports = router;