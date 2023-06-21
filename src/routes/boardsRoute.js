const express = require("express");

const boardsController = require("../controllers/boardsController");
const cardsController = require("../controllers/cardController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

// router.get("/", boardsController.getBaords);
router.get("/getCards/:id", authenticate, cardsController.getCardsByBoard);

module.exports = router;
