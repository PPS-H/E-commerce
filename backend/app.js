const express = require("express");
const app = express();
const dotenv = require("dotenv");
const ErrorMiddleware = require("./middleware/error");
const user = require("./controller/user");

// process is an node js global object containing lots of information about node js
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./backend/config/.env",
  });
}

app.use("/", user);

app.use(ErrorMiddleware);

module.exports = app;
