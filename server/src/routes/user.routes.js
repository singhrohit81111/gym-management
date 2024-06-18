const express = require("express");
const router = express.Router();
const {
  login,
  register,
  updatePassword,
  getCurrentUser,
  logout,
} = require("../controllers/user.controllers");

router.route("/login").get(login);
router.route("/register").post(register);
router.route("/update-password").post(updatePassword);
router.route("/current-user").get(getCurrentUser);
router.route("/logout").post(logout);

module.exports = router;
