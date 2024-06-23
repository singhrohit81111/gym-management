const express = require("express");
const router = express.Router();

const verifyJWT = require("../../middlewares/auth.middleware");
const { authController } = require("../../controllers");

router.route("/login").post(authController.login);
router.route("/register").post(authController.register);
router.route("/update-password").post(verifyJWT, authController.updatePassword);
router.route("/current-user").get(verifyJWT, authController.getCurrentUser);
router.route("/logout").post(verifyJWT, authController.logout);

module.exports = router;
