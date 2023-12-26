const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const User = require("../model/user");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendMail");
const sendToken = require("../utils/JWTToken");
const { isAuthenticated } = require("../middleware/checkAuth");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { fullname, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    const filePath = req.file.path;

    // Because file is already saved by multer using upload.single("file") so if user exists already then we have to delete that file.
    fs.unlink(filePath, (error) => {
      if (error) {
        res.status(400).json({
          message: "Failed to delete file",
        });
      }
    });

    return next(new ErrorHandler("User already exist with this email", 400));
  }

  const avatar = path.join(req.file.path);
  const user = { fullname, email, password, avatar };
  const activationToken = createActivationToken(user);
  const activationURL = `http://localhost:3000/activation/${activationToken}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Activation you account",
      message: `Hello ${user.fullname}, please click on the link to activate your account: ${activationURL}`,
    });
    res.status(201).json({
      success: true,
      message: `please check your email:- ${user.email} to activate your account!`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Creating token for email verfication of the account
const createActivationToken = (user) => {
  // Generating JWT token on the whole user object because currently user is not stored in the database.
  return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "5m" });
};

// Activating user account bt it's email link
router.post("/activation", async (req, res, next) => {
  console.log("activation");
  try {
    const { activation_token } = req.body;

    const userAccountInfo = jwt.verify(
      activation_token,
      process.env.SECRET_KEY
    );

    if (!userAccountInfo) {
      return next(new ErrorHandler("Invalid token!", 400));
    }

    const { fullname, email, password, avatar } = userAccountInfo;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }
    user = await User.create({
      fullname,
      email,
      password,
      avatar,
    });
    sendToken(user, 201, res);
  } catch (error) {
    return new ErrorHandler(error.message, 400);
  }
});

// User login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please fill out all the fields!", 400));
  }
  let user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Inavalid credentials", 400));
  }

  // Using user model schema function to compare plain password with it's stored hash value.
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return next(new ErrorHandler("Inavalid credentials", 400));
  }

  sendToken(user, 200, res);
});

// Getting user
router.get("/getUser", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
module.exports = router;
