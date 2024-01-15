const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const pool = require("../db/connect");

const getAllDraftPosts = async (req, res) => {
  const sql = "SELECT * FROM posts_draft";

  const values = [];

  pool.query(sql, values, (queryError, results) => {
    if (queryError) {
      console.error("Database query error:", queryError);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Database query error" });
    } else {
      res.status(StatusCodes.OK).json({ posts: results });
    }
  });
};

const createDraftPost = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    // check if token exists
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Unauthorized no token" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    // check if token is valid
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Unauthorized invalid token" });
  }

  const values = [
    req.body.title,
    req.body.description,
    req.body.content,
    req.body.image,
    req.body.date,
    decoded.id,
    req.body.category,
  ];

  const sql =
    "INSERT INTO posts_draft(`title`, `description`, `content`,	 `image`, `date`,`userId`, `category` ) VALUES (?, ?, ?, ?, ?, ?, ?)";

  pool.query(sql, values, (queryError, results) => {
    if (queryError) {
      console.error("Database query error:", queryError);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Database query error" });
    } else {
      res.status(StatusCodes.OK).json({ post: results });
    }
  });
};

module.exports = { getAllDraftPosts, createDraftPost }; // export getAllDraftPosts
