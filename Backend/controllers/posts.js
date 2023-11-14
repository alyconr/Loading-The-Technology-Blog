
const { StatusCodes } = require('http-status-codes');


const dbUrl = process.env.MYSQL_URI;
const caPath = process.env.CA_PATH;
const pool = require('../db/connect')(dbUrl, caPath);



const getAllPosts = async (req, res) => {
    const sql = 'SELECT * FROM posts';

    pool.query(sql, (queryError, results) => {
        if(queryError) {
            console.error('Database query error:', queryError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Database query error' });

        } else {
            res.status(StatusCodes.OK).json({ posts: results });
        }

    })

}

module.exports = {
    getAllPosts
}