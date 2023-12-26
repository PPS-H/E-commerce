const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");

// Middleware to check that if user is authenticated or not
exports.isAuthenticated =  (req, res, next) => {
  // Accessing cookies form the client browser
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to continue", 401));
  }

  //   Getting user id from jwt token
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  // setting user id in the req object
  req.userId = decoded.id
  next();
};
