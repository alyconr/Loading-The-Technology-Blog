require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");



app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postsRouter);

app.get("/", (req, res) => {
  res.send("Hello World, IT WORKS");
});

const port = process.env.PORT || 9000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(
        `Server is listening on port ${port} and Database is connected`
      )
    );
  } catch (error) {
    console.log(error);
  }
};

start();
