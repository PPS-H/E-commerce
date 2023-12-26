const express = require("express");
const app = express();
const ErrorMiddleware = require("./middleware/error");
const user = require("./controller/user");
const cors=require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(express.json())
app.use(cookieParser());

// By using origin and credentials , we can set cookies on the client side
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// process is an node js global object containing lots of information about node js
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./backend/config/.env",
  });
}

app.use("/api/v2/user", user);

// For handling all the errors form all routes
app.use(ErrorMiddleware);

module.exports = app;
