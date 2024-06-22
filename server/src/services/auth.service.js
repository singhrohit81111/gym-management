const { User } = require("../models");
const ApiError = require("../utils/ApiError");

const registerUser = async (firstName, lastName, email, password) => {
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

  const user = await User.findOne({ _id: createdUser._id }).select("-password");
  return user;
};

const login = async (email, password) => {
  if ([email, password].some((field) => !field)) {
    throw new ApiError(404, "All Fields required");
  }
  const existignUser = await User.findOne({ email });
  if (!existignUser) {
    throw new ApiError(404, "No user Exist! Kindly register");
  }
  const isPasswordMatching = await existignUser.isPasswordCorrect(password);
  if (!isPasswordMatching) {
    throw new ApiError(400, "Password doesnot match");
  }
};

const findUser = async (userID) => {
  const user = await User.findById(userID);
  return user;
};

const updatePassword = async (currentPassword, updatedPassword) => {
  const user = await User.findById(req.user["_id"]);
  const isPasswordMatching = await user.isPasswordCorrect(currentPassword);
  if (!isPasswordMatching) {
    throw new ApiError(401, "Current password is not matching");
  }
  user.password = updatedPassword;
  await user.save({ validateBeforeSave: false });
};

const logout = async (user) => {
  await User.findByIdAndUpdate(
    user._id,
    {
      $unset: { refreshToken: 1 },
    },
    {
      new: true,
    }
  );
};

module.exports = { registerUser, login, findUser, updatePassword, logout };
