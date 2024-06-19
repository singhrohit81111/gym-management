const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user.model");

const verifyJWT = asyncHandler(async (req, res, next) => {
  const incomingAccessToken =
    req.cookies?.accessToken ||
    req.header["Authorizaation"].replace("Bearer", "");
  if (!incomingAccessToken) {
    throw new ApiError(401, "Unauthorised request");
  }
  const decodedToken = await jwt.verify(
    incomingAccessToken,
    process.env.ACCESS_TOKEN
  );
  const user = await User.findById(decodedToken._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }
  req.user = user;
  next();
});

module.exports = verifyJWT;
