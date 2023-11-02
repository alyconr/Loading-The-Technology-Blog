const express = require('express');
const router = express.Router();




const { getAllPosts } = require('../controllers/posts');



router.route('/').get(getAllPosts);



module.exports = router;