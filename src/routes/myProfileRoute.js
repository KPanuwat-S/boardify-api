const express = require("express");

const myProfileController = require("../controllers/myProfileController");
const authenticate = require("../middlewares/authenticate");
// const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/project", authenticate, myProfileController.getproject);

module.exports = router;
