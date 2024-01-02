require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const pool = require("../db/connect");

const getAllUsers = async (req, res) => {
  const sql =
    "SELECT `fullname`, `username`, `email`,  users.image AS userImage FROM users";

  pool.query(sql, (queryError, results) => {
    if (queryError) {
      console.error("Database query error:", queryError);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Database query error" });
    } else {
      res.status(StatusCodes.OK).json({ users: results });
    }
  });
};

const getCurrentUser = async (req, res) => {
  const { username } = req.params;

  const sql =
    "SELECT users.id, `fullname`, `username`, `email`,  `bio`, users.image AS userImage, `company`, `location`, `social1`, `social2` FROM users WHERE username = ?";

  const values = [username];

  pool.query(sql, values, (queryError, results) => {
    if (queryError) {
      console.error("Database query error:", queryError);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Database query error" });
    } else {
      res.status(StatusCodes.OK).json(results);
    }
  });
};

const getUserPosts = async (req, res) => {
  const { username } = req.params;

  const sql =
    "SELECT *  FROM users JOIN posts ON users.id = posts.uid WHERE users.username = ?";

  const values = [username];

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

const updateUser = async (req, res) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (req.body.password && !req.body.password.match(passwordRegex)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      result:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    });
  }

  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

  const sql =
    "UPDATE users SET `fullname` = ?, `password`= ?, `bio` = ?, `company` = ?, `location` = ?, `social1` = ?, `social2` = ? WHERE `username` = ?";

  const values = [
    req.body.fullname,
    hashedPassword,
    req.body.bio,
    req.body.company,
    req.body.location,
    req.body.social1,
    req.body.social2,
    req.params.username,
  ];

  pool.query(sql, values, (queryError, results) => {
    if (queryError) {
      console.error("Database query error:", queryError);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Database query error" });
    } else {
      res.status(StatusCodes.OK).json(results);
    }
  });
};

module.exports = {
  getCurrentUser,
  updateUser,
  getUserPosts,
  getAllUsers,
};
