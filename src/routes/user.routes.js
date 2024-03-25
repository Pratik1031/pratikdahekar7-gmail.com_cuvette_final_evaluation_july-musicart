const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

router.route("/login").post(userController.login);
router.route("/signup").post(userController.signup);
router.route("/logout").post(verifyJWT, userController.logout_user);

module.exports = router;
