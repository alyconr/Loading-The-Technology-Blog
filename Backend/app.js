require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const cors = require("cors");

const dbUrl = process.env.MYSQL_URI;
const caPath = process.env.CA_PATH;
const pool = require("./db/connect");

app.use(express.json());
app.use(cors());




app.get ("/test", (req, res) => {
    res.send("Hello World, IT WORKS");
});


const port = process.env.PORT || 9000;


const start = async () => {
   try {    
    await pool(dbUrl, caPath);
    app.listen(port, () => console.log(`Server is listening on port ${port} and Database is connected`));
   } catch (error) {
    console.log(error);
   }
}

start();




