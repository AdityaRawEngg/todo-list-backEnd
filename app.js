const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const taskRouter = require("./routes/taskRoutes");

const app = express();

dotenv.config({ path: "./config.env" });
app.use(express.json());

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, connection) => {
    if (err) {
      return console.log("Error in connection");
    }
    app.use("/todoList", taskRouter);
    app.listen(3000, () => {
      console.log("Server Started");
    });
  }
);
