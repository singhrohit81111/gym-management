const User = require("../models/user.model");

const generateRefreshAndAccessToken = async (userID) => {
  const user = await User.findOne({ _id: userID });
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

module.exports = { generateRefreshAndAccessToken };
