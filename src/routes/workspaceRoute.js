const express = require("express");

const workSpaceController = require("../controllers/workspaceController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.get("/user/:userId", authenticate, (req, res, next) => res.json("hi"));

module.exports = router;
