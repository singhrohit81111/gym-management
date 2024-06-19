const express = require("express");
const router = express.Router();
const {
  login,
  register,
  updatePassword,
  getCurrentUser,
  logout,
} = require("../controllers/user.controllers");
const verifyJWT = require("../middlewares/auth.middleware");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/update-password").post(verifyJWT, updatePassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/logout").post(verifyJWT, logout);

module.exports = router;
