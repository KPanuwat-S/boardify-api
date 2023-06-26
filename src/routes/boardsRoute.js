const express = require("express");

const boardsController = require("../controllers/boardsController");
const cardsController = require("../controllers/cardController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

// router.get("/", boardsController.getBaords);
router.get("/cards/:id", cardsController.getCardsByBoardId);
router.post("/cards/:id", cardsController.addCard);
router.patch("/updateCard/", cardsController.updateNameCard);
router.delete("/cards/:id", cardsController.deleteCard);
router.patch("/test", cardsController.test);

module.exports = router;
