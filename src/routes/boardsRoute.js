const express = require("express");

const boardsController = require("../controllers/boardsController");
const cardsController = require("../controllers/cardController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

// router.get("/", boardsController.getBaords);
router.get("/cards/:id", cardsController.getCardsByBoardId);

module.exports = router;
