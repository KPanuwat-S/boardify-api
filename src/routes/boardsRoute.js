const express = require("express");

const boardsController = require("../controllers/boardsController");

const router = express.Router();

router.post("/createBoard", boardsController.createBoard);
router.get("/", boardsController.getBoard);

module.exports = router;
