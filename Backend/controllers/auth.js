require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const dbUrl = process.env.MYSQL_URI;
const caPath = process.env.CA_PATH;
const pool = require("../db/connect")(dbUrl, caPath);
const bcrypt = require("bcryptjs");


const register = async (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?  or username = ? ";

  pool.query(
    sql,
    [req.body.email, req.body.username],
    (queryError, results) => {
      if (queryError) {
        console.error("Database query error:", queryError);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Database query error" });
      }

      if (results.length > 0) {
        if (results[0].email === req.body.email) {
          res .status(StatusCodes.BAD_REQUEST).json({ error: "Email already exists" });        } else if (results[0].username === req.body.username) {
          res .status(StatusCodes.BAD_REQUEST).json({ error: "Username already exists" });
        }
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const sql =
          "INSERT INTO users (username, email, password) VALUES(?,?,?)";
        pool.query(
          sql,
          [req.body.username, req.body.email, hash],
          (queryError, results) => {
            if (queryError) {
              console.error("Database query error:", queryError);
              res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: "Database query error" });
            }

            res.status(StatusCodes.CREATED).json({
              message: "User created successfully",
              user: {
                username: req.body.username,
                email: req.body.email,
              },
            });
          }
        );
      }
    }
  );
};

const login = async (req, res) => {
  
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  if(!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "All fields are required, please provide email and password" });
  }

  pool.query(sql, [email], (queryError, results) => {
    if (queryError) {
      console.error("Database query error:", queryError);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Database query error" });
    }

    if (results.length === 0) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
    } else {
      const user = results[0];

      if (!bcrypt.compareSync(password, user.password)) {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid password" });
      } else {
        res.status(StatusCodes.OK).json({ message: "User logged in successfully", user: { username: user.username, email: user.email } });
      }


      }



  })





};

module.exports = {
  register, login
};
