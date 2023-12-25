const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();

router.get("/", (req, res, next) => {
  const userExists = true;

  if (userExists) {
    return next(new ErrorHandler("User alread exists", 400));
  }

  res.status(200).json({
    message: "User created succesfully",
  });
});

module.exports = router;
