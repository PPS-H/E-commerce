const sendToken = (user, statusCode, res) => {
  // Generating token on user's mongoDb id. (Function defined in the User model schema)
  const token = user.getJwtToken();

  const config = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    Secure: true,
  };

  res.status(statusCode).cookie("token", token, config).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
