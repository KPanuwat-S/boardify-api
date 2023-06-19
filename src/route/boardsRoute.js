const express = require("express");
const router = express.Router();
const boardsController = require("./../controllers/boardsController");
router.get("/", boardsController.getBaords);

module.exports = router;
