const express = require("express");
const authenticate = require("../middlewares/authenticate");
const boardsController = require("../controllers/boardsController");
const cardsController = require("../controllers/cardController");
const taskController = require("../controllers/tasksController");
const upload = require("../middlewares/upload");
const router = express.Router();

router.get("/cards/:id", cardsController.getCardsByBoardId);
router.post("/cards/:id", cardsController.addCard);
router.patch("/cardsDnd/:id", cardsController.updateCard);
router.patch("/cardsName/:id", cardsController.updateCard);
router.patch("/tasksDnd/:id", cardsController.updateTask);
router.delete("/cards/:id", cardsController.deleteCard);
router.get("/tasks/:id", taskController.getTaskById);
router.post("/tasks/:id", taskController.addTask);
router.patch("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTaskById);
//require taskId

module.exports = router;
