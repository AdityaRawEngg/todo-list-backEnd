const Task = require("../models/taskSchema");
const AppError = require("../helpers/appErrorClass");
const sendError = require("../helpers/sendError");
const sendResponse = require("../helpers/sendResponse");

const getAllTask = (req, resp, next) => {
  Task.find(req.query)
    .then((data) => {
      if (data.length == 0) {
        return sendError(
          new AppError(404, "Unsuccessful", "No task Found"),
          resp
        );
      }
      sendResponse(200, data, resp);
    })
    .catch((err) => {
      return sendError(new AppError(500, "Unsuccessful", err.message), resp);
    });
};

const getSingleTask = (req, resp, next) => {
  Task.findOne(req.params)
    .then((data) => {
      if (data.length == 0) {
        return sendError(
          new AppError(404, "Unsuccessful", "Task Not Found"),
          resp
        );
      }
      sendResponse(200, data, resp);
    })
    .catch((err) => {
      return sendError(new AppError(500, "Unsuccessful", err.message), resp);
    });
};

const createTask = (req, resp, next) => {
  let newTask = new Task(req.body);
  newTask
    .save()
    .then((data) => {
      sendResponse(200, data, resp);
    })
    .catch((err) => {
      return resp.send(err.message);
    });
};

const updateOneTask = (req, resp, next) => {
  Task.updateOne(req.params, req.body)
    .then((result) => {
      if (result.nModified == 0) {
        return sendError(
          new AppError(404, "Unsuccessful", "Task Not Found"),
          resp
        );
      }
      resp.status(200).json({
        status: "Successful",
        message: "task Successfully Updated",
      });
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

const deleteTask = (req, resp, next) => {
  Task.deleteOne(req.params)
    .then((result) => {
      if (result.n == 0) {
        return sendError(
          new AppError(404, "Unsuccessful", "Task Not Found"),
          resp
        );
      }
      resp.status(200).json({
        status: "Successful",
        message: "task Successfully Deleted",
      });
    })
    .catch((err) => {
      return err;
    });
};

module.exports = {
  getAllTask,
  getSingleTask,
  createTask,
  updateOneTask,
  deleteTask,
};
