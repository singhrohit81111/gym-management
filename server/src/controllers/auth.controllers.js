const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user.model");
const { OPTIONS } = require("../constants");
const { tokenService, authService } = require("../services");

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  await authService.login(email, password);

  const { accessToken, refreshToken } =
    tokenService.generateRefreshAndAccessToken(existignUser._id);

  res
    .status(200)
    .cookie("accessToken", accessToken, OPTIONS)
    .cookie("refreshToken", refreshToken, OPTIONS)
    .json("Login Successfully");
});

const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const createdUser = await authService.registerUser(
    firstName,
    lastName,
    email,
    password
  );

  const { accessToken, refreshToken } =
    await tokenService.generateRefreshAndAccessToken(createdUser._id);

  const user = await authService.findUser(createdUser._id);
  res
    .status(200)
    .cookie("accessToken", accessToken, OPTIONS)
    .cookie("refreshToken", refreshToken, OPTIONS)
    .json(user);
});

const getCurrentUser = asyncHandler(async (req, res, next) => {
  const { user } = req;
  res.status(200).json(user);
});

const updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, updatedPassword } = req.body;

  await authService.updatePassword(currentPassword, updatedPassword);

  res.status(200).json("password updated successfully");
});

const logout = asyncHandler(async (req, res, next) => {
  const { user } = req;

  await authService.logout(user);

  res
    .status(200)
    .clearCookie("accessToken", OPTIONS)
    .clearCookie("refreshToken", OPTIONS)
    .json("Logged out successfully");
});

module.exports = { login, register, updatePassword, getCurrentUser, logout };
