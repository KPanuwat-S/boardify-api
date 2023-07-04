const express = require("express");
const authenticate = require("../middlewares/authenticate");
const boardsController = require("../controllers/boardsController");
const cardsController = require("../controllers/cardController");
const taskController = require("../controllers/tasksController");
const upload = require("../middlewares/upload");
const router = express.Router();
// Create Board
router.post("/", boardsController.createBoard);

// Get all boards in the workspace
router.get("/:workspaceId", boardsController.getAllBoardsByWorkspaceId);
router.get("/board/:id", boardsController.getOneBoard);
router.patch("/board/:id", boardsController.editBoardName);
router.get("/cards/:id", cardsController.getCardsByBoardId);
router.get("/dashBoard/:id", cardsController.getDashBoard);
router.post("/cards/:id", cardsController.addCard);
router.patch("/cardsDnd/:id", cardsController.updateCardDnd);
router.patch("/cardsName/:id", cardsController.updateNameCard);
router.patch("/tasksDnd/:id", cardsController.updateTask);
router.delete("/cards/:id", cardsController.deleteCard);
router.patch("/cards/card/:id", cardsController.updateCardName);
// router.patch("/updateCard/:id", cardsController.updateNameCard);

// router.post("/tasks/member", taskController.addMeToTask);

router.get("/tasks/members/all/:id", taskController.getMembersInTask);
router.get("/tasks/:id", taskController.getTaskById);

router.post("/tasks/members/me", taskController.addMeToTask);
router.delete("/tasks/members/me/:id", taskController.removeMeFromTask);

router.post("/tasks/checklists", taskController.addChecklist);
router.post("/tasks/:id", taskController.addTask);
router.patch("/tasks/checklists", taskController.editChecklist);

router.patch("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTaskById);
//require taskId

module.exports = router;
