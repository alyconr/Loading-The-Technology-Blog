require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const dbUrl = process.env.MYSQL_URI;
const caPath = process.env.CA_PATH;
const pool = require("../db/connect")(dbUrl, caPath);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?  or username = ? ";

  pool.query(
    sql,
    [req.body.email, req.body.username],
    (queryError, results) => {
      if (queryError) {
        console.error("Database query error:", queryError);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Database query error" });
      }

      if (results.length > 0) {
        if (results[0].email === req.body.email) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: "Email already exists" });
        }

        if (results[0].username === req.body.username) {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: "Username already exists" });
        }
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const sql = "INSERT INTO users (username, email, password) VALUES(?,?,?)";
      pool.query(
        sql,
        [req.body.username, req.body.email, hash],
        (queryError, results) => {
          if (queryError) {
            console.error("Database query error:", queryError);
            return res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ error: "Database query error" });
          }

          res.status(StatusCodes.CREATED).json({
            message: "User created successfully",
            user: {
              id: results.insertId,
              username: req.body.username,
              email: req.body.email,
            },
          });
        }
      );
    }
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "All fields are required, please provide email and password",
    });
  }

  pool.query(sql, [email], (queryError, results) => {
    if (queryError) {
      console.error("Database query error:", queryError);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Database query error" });
    }

    if (results.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }
    const user = results[0];

    if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
      })
      .status(StatusCodes.OK)
      .json({
        message: "User logged in successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          token,
        },
      });
  });
};

const logout = async (req, res) => {
  res.clearCookie("token", {
    domain: "localhost",
    path: "/",
  });
  return res
    .status(StatusCodes.OK)
    .json({ message: "User logged out successfully" });
};

module.exports = {
  register,
  login,
  logout,
};
