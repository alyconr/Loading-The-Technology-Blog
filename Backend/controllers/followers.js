require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const pool = require("../db/connect");

const createFollower = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    // check if token exists
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Unauthorized no token" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
  }

  if (decoded.id === req.body.following_id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Can't follow yourself" });
  }

  const sql =
    "INSERT INTO followers (`follower_id`, `following_id`, `followers_count` ) VALUES (?, ?, ?) ";

  const values = [decoded.id, req.body.following_id, req.body.followers_count]; // decoded.id is the user id

  pool.query(sql, values, (queryError, results) => {
    if (queryError) {
      console.error("Database query error:", queryError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    } else {
      res
        .status(StatusCodes.OK)
        .json({ message: "Follower created successfully" });
    }
  });
};

const getTotalFollowers = (req, res) => {
  const sql =
    "SELECT users.id, followers.following_id, users.username, users.image AS userImage, SUM(followers.followers_count) AS total_followers " +
    "FROM followers " +
    "JOIN users ON followers.follower_id = users.id " +
    "WHERE followers.following_id = ? " +
    "GROUP BY users.id, followers.following_id, users.username, users.image";

  const values = [req.params.id];

  pool.query(sql, values, (queryError, results) => {
    if (queryError) {
      console.error("Database query error:", queryError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Database query error" });
    } else {
      // Calculate the sum of total_followers
      const totalFollowersSum = results.reduce(
        (sum, result) => 
          sum + parseInt(result.total_followers, 10), 0
        
        );

       // Add the totalFollowersSum as a number to each result
      const resultsWithSum = results.map(result => ({
        ...result,      
      }));

      // Append the total sum as a number to the end of the array
      resultsWithSum.push({
        total_followers_sum: totalFollowersSum
      });

      res.status(StatusCodes.OK).json(resultsWithSum);
    }
  });
};



const getUserFollowers = async (req, res) => {
  const sql =
    "SELECT users.id, `fullname`, users.image AS userImage, SUM(followers.followers_count) AS total_followers FROM followers " +
    "JOIN users ON followers.follower_id = users.id " +
    "WHERE following_id = ? " +
    "GROUP BY users.id, `fullname` , users.image";

  const values = [req.params.id];

  pool.query(sql, values, (queryError, results) => {
    if (queryError) {
      console.error("Database query error:", queryError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    } else {
      res.status(StatusCodes.OK).json(results);
    }
  });
};

const unfollowUser = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    // check if token exists
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Unauthorized no token" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
  }

  const sql =
    "DELETE FROM followers WHERE follower_id = ? AND following_id = ?";

  const values = [decoded.id, req.body.following_id]; // decoded.id is the user id

  pool.query(sql, values, (queryError, results) => {
    if (queryError) {
      console.error("Database query error:", queryError);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Database query error" });
    } else {
      res
        .status(StatusCodes.OK)
        .json({ message: "Follower deleted successfully" });
    }
  });
};

module.exports = {
  createFollower,
  getTotalFollowers,
  getUserFollowers,
  unfollowUser,
};
