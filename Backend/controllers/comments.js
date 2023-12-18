require('dotenv').config();
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');

const dbUrl = process.env.MYSQL_URI;
const caPath = process.env.CA_PATH;
const pool = require("../db/connect")(dbUrl, caPath);

const createComment = async (req, res) => {

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
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
    }


    const sql = "INSERT INTO comments (`userID`, `postID`, `comment`) VALUES (?, ?, ?)";

  

    const values = [decoded.id, req.body.postID, req.body.comment];

    pool.query(sql, values, (queryError, results) => {
        if (queryError) {
            console.error("Database query error:", queryError);
            res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: "Database query error" });
        } else {
            res.status(StatusCodes.OK).json({ message: "Comment posted successfully" });
        }
    })
}


const  getComments = async (req, res) => {

    const sql = "SELECT * FROM comments WHERE postID = ?";

    const values = [req.params.id];

    pool.query(sql, values, (queryError, results) => {
        if (queryError) {
            console.error("Database query error:", queryError);
            res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: "Database query error" });
        } else {
            res.status(StatusCodes.OK).json({ comments: results });
        }
    })
}
 
module.exports = {
    createComment,
    getComments
}