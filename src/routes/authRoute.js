const express = require("express");

const authController = require("../controllers/authController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/getUser", authenticate, authController.getUser);
router.get("/emailconfirmation/:token", authController.verify);
router.post("/googleLogin", authController.googleLogin);

module.exports = router;
