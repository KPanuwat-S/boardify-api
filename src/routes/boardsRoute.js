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
router.post("/cards/:id", cardsController.addCard);
router.patch("/updateCard/", cardsController.updateNameCard);
router.delete("/cards/:id", cardsController.deleteCard);
router.patch("/cards/card/:id", cardsController.updateCardName);
// router.patch("/test", cardsController.test);
router.patch("/updateCard/:id", cardsController.updateNameCard);

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
router.delete("/tasks/checklists/:id", taskController.deleteChecklistById);

//require taskId
router.post(
  "/tasks/attachment/:id",
  upload.single("file"),
  taskController.addAttachment
);
//require attachmentId
router.delete("/tasks/attachment/:id", taskController.deleteAttachment);
//comment
// router.post("/tasks/comment/:id", taskController.addComment);

module.exports = router;
