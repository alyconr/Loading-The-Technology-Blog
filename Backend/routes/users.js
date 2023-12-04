const express = require("express");
const router = express.Router();

const authorizedUser = require("../middleware/authorizedUser");

const { getCurrentUser, updateUser, getUserPosts, getAllUsers } = require("../controllers/users");

router.route("/:username").get(getCurrentUser).put(authorizedUser, updateUser);;
router.route("/posts/:username").get(getUserPosts);
router.route("/").get(getAllUsers);

module.exports = router;
