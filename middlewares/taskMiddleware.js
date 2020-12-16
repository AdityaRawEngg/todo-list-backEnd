const AppError = require("../helpers/appErrorClass");
const sendError = require("../helpers/sendError");

const verifyPostRequest = (req, resp, next) => {
  //If req body has taskName
  if (
    !["taskName"].every((key) => {
      return req.body[key];
    })
  ) {
    return sendError(
      new AppError(400, "Unsuccessful", "Request body not Valid"),
      resp
    );
  }
  next();
};

const verifyUpdateRequest = (req, resp, next) => {
  //if req.body has taskName or status
  if (
    !["taskName", "status"].some((key) => {
      return req.body[key];
    })
  ) {
    return sendError(
      new AppError(400, "Unsuccessful", "Request body not Valid"),
      resp
    );
  }
  next();
};

module.exports = { verifyPostRequest, verifyUpdateRequest };
