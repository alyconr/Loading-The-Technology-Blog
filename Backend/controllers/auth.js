require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const pool = require("../db/connect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateResetToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const experiesAt = new Date();
  experiesAt.setHours(experiesAt.getHours() + 1); // expires in 1 hour
  return { token, experiesAt };
};

const register = async (req, res) => {
  const sql =
    "SELECT * FROM users WHERE  fullname=? or username = ? or email = ?  ";

  pool.query(
    sql,
    [req.body.fullname, req.body.username, req.body.email],
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
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: "Username already exists" });
        }
      }

      // validate password at least 8 characters long and contains at least one number and one special character

      const passwordRegex =
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

      if (!passwordRegex.test(req.body.password)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error:
            "Password must be at least 8 characters long and contain at least one number and one special character",
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const sql =
        "INSERT INTO users (fullname, username, email, password) VALUES(?,?,?,?)";
      pool.query(
        sql,
        [req.body.fullname, req.body.username, req.body.email, hash],
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
              fullname: req.body.fullname,
              username: req.body.username,
              email: req.body.email,
            },
          });
        }
      );
    }
  );
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  const { token, experiesAt } = generateResetToken();

  const updateTokenSql =
    "UPDATE users SET reset_token = ?, reset_token_expires_at = ? WHERE email = ?";

  pool.query(
    updateTokenSql,
    [token, experiesAt, email],
    (queryError, results) => {
      if (queryError) {
        console.error("Database query error:", queryError);
      }

      res.status(StatusCodes.OK).json({
        message: "Password reset token sent to your email",
        token,
        experiesAt,
      });
    }
  );
};


const resetPassword = async (req, res) => {
  try {
    const { email, password, token } = req.body;

    // Check if the email and password are provided
    if (!email || !password || !token) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Email, password, and reset token are required",
      });
    }

    // Check if the reset token is valid
    const checkTokenSql =
      "SELECT * FROM users WHERE email = ? AND reset_token = ? AND reset_token_expires_at > NOW()";
      
  console.log("Query:", checkTokenSql, [email, token]);

    pool.query(checkTokenSql, [email, token],  (queryError, results) => {
      if (queryError) {
        console.error("Database query error:", queryError);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Database query error" });
      }

      if (results.length === 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid or expired reset token" });
      }

      // Hash the new password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Update the user's password and clear the reset token
      const updatePasswordSql =
        "UPDATE users SET password = ?, reset_token = NULL, reset_token_expires_at = NULL WHERE email = ?";

     pool.query(updatePasswordSql, [hashedPassword, email]);

      res.status(StatusCodes.OK).json({
        message: "Password reset successfully",
      });
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error while resetting the password",
    });
  }
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
        fullname: user.fullname,
        email: user.email,
        image: user.image,
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
          fullname: user.fullname,
          email: user.email,
          image: user.image,
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
  requestPasswordReset,
  resetPassword,
};
