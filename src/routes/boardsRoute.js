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

router.get("/cards/:id", cardsController.getCardsByBoardId);
router.post("/cards/:id", cardsController.addCard);
router.patch("/updateCard/", cardsController.updateNameCard);
router.delete("/cards/:id", cardsController.deleteCard);
router.patch("/test", cardsController.test);
router.patch("/updateCard/:id", cardsController.updateNameCard);


router.get("/tasks/:id", taskController.getTaskById);
router.patch("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTaskById);

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
