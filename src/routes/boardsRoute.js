const express = require("express");

const boardsController = require("../controllers/boardsController");
const cardsController = require("../controllers/cardController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

// router.get("/", boardsController.getBaords);
router.get("/cards/:id", cardsController.getCardsByBoard);
router.post("/addCard/:id", cardsController.addCard);
router.patch("/updateCard/", cardsController.updateNameCard);
router.delete("/deleteCard/:id", cardsController.deleteCard);

module.exports = router;
