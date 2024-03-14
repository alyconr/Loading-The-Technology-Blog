require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const pool = require("../db/connect");


const createBookmark = async (req, res) => {
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

    const sql =
        "INSERT INTO bookmarks (`usersId`, `postsId`) VALUES (?, ?)";
    
    const values = [
        req.body.usersId,
        req.body.postsId,
    ];

    pool.query(sql, values, (queryError, results) => {
        
        if (queryError) {
            console.error("Database query error:", queryError);
            res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: "Database query error" });
        } else {
            res.status(StatusCodes.OK).json({ message: "Bookmark created successfully" });
        }
    })
}

const getAllBookmarks = async (req, res) => {
    const sql = "SELECT bookmarks.*, users.fullname, users.username, posts.title, posts.description, posts.image, users.image AS userImage, posts.content, posts.date, posts.category FROM bookmarks JOIN users ON bookmarks.usersId = users.id JOIN posts ON bookmarks.postsId = posts.id";


    const values = [];

    pool.query (sql, values, (queryError, results) => {
        if (queryError) {
            console.error("Database query error:", queryError);
            res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: "Database query error" });
        } else {
            res.status(StatusCodes.OK).json(results);
        }
    })



}

module.exports = {
    createBookmark,
    getAllBookmarks
}

