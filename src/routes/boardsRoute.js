const express = require("express");
const authenticate = require("../middlewares/authenticate");
const boardsController = require("../controllers/boardsController");
const cardsController = require("../controllers/cardController");

const router = express.Router();
router.post("/", authenticate, boardsController.createBoard);
router.get("/:workspaceId", boardsController.getAllBoardsByWorkspaceId);
router.get("/cards/:id", cardsController.getCardsByBoardId);
router.post("/cards/:id", cardsController.addCard);
router.patch("/updateCard/", cardsController.updateNameCard);
router.delete("/cards/:id", cardsController.deleteCard);
router.patch("/test", cardsController.test);

module.exports = router;
