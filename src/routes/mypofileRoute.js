const express = require("express");

const myprofileController = require("../controllers/mypofileController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/project", authenticate, myprofileController.getproject);

module.exports = router;
