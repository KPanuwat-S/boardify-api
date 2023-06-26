const express = require("express");

const workspaceController = require("../controllers/workspaceController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.get("/", authenticate, workspaceController.getAllWorkspaces);
router.get(
  "/members/:workspaceId",
  authenticate,
  workspaceController.getAllMembersInWorkspace
);
router.get(
  "/workspace/:workspaceId",
  authenticate,
  workspaceController.getOneWorkSpace
);
router.post("/", authenticate, workspaceController.createWorkspaceById);
router.delete("/:id", authenticate, workspaceController.deleteWorkspaceById);
router.patch("/:id", authenticate, workspaceController.updateWorkspace);
// router.post("/", authenticate, workspaceController.addMemberWorkspaceBy);

module.exports = router;
