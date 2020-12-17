const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const taskRouter = require("./routes/taskRoutes");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, connection) => {
    if (err) {
      return console.log("Error in connection");
    }
    app.get("/", (req, resp) => {
      resp.send("Welcome to home page");
    });
    app.use("/todoList", taskRouter);
    app.listen(PORT, () => {
      console.log(`Server Started on port ${PORT}`);
    });
  }
);
