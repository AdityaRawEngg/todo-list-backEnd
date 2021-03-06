const express = require("express");
const {
  getAllTask,
  getSingleTask,
  createTask,
  updateOneTask,
  deleteTask,
} = require("../controllers/taskController");
const {
  verifyPostRequest,
  verifyUpdateRequest,
} = require("../middlewares/taskMiddleware");

const router = express.Router();

router.route("/tasks").get(getAllTask).post(verifyPostRequest, createTask);

router
  .route("/tasks/:taskId")
  .get(getSingleTask)
  .put(verifyUpdateRequest, updateOneTask)
  .delete(deleteTask);
module.exports = router;
