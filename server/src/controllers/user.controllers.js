const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user.model");
const { OPTIONS } = require("../constants");

const generateRefreshAndAccessToken = async (userID) => {
  const user = await User.findOne({ _id: userID });
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

const login = asyncHandler(async (req, res, next) => {});

const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if ([firstName, lastName, email, password].some((field) => !field)) {
    throw new ApiError(404, "All fields are required");
  }
  const existignUser = await User.findOne({ email });
  if (existignUser) {
    throw new ApiError(404, "User already exists");
  }
  const createdUser = await User.create({
    firstName,
    lastName,
    email,
    password,
  });
  const { accessToken, refreshToken } = await generateRefreshAndAccessToken(
    createdUser._id
  );
  console.log(accessToken, ">>>>>>>>>>", refreshToken);
  const user = await User.findOne({ _id: createdUser._id }).select("-password");
  res
    .status(200)
    .cookie("accessToken", accessToken, OPTIONS)
    .cookie("refreshToken", refreshToken, OPTIONS)
    .json(user);
});

const getCurrentUser = asyncHandler(async (req, res, next) => {});

const updatePassword = asyncHandler(async (req, res, next) => {});

const logout = asyncHandler(async (req, res, next) => {});

module.exports = { login, register, updatePassword, getCurrentUser, logout };
