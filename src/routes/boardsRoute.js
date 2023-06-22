const express = require("express");

const boardsController = require("../controllers/boardsController");

const router = express.Router();

router.post("/createBoard", boardsController.createBoard);
router.get("/getAllBoard", boardsController.getAllBoard);

module.exports = router;
