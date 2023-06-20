const express = require("express");

const boardsController = require("../controllers/boardsController");

const router = express.Router();

router.get("/", boardsController.getBaords);

module.exports = router;
