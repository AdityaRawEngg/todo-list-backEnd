const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uniqid = require("uniqid");
const { response } = require("express");
const taskSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
      default: uniqid(),
    },
    taskName: {
      type: String,
      required: [true, "Please Enter Task Details"],
    },
    status: {
      type: String,
      default: "Not Completed",
      enum: ["Not Completed", "In Progress", "Completed"],
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
