const express = require("express");

const workspaceController = require("../controllers/workspaceController");

const workSpaceController = require("../controllers/workspaceController");
const router = express.Router();

router.get("/", workSpaceController.getAllWorkspaces);
router.get("/workspace/:workspaceId", workspaceController.getOneWorkSpace);
router.get(
  "/members/:workspaceId",
  workSpaceController.getAllMembersInWorkspace
);
router.post("/", workspaceController.createWorkspaceById);
router.post("/", workspaceController.addMemberWorkspaceById);
router.get("/countMemberWorkspace/:id", workspaceController.countMemberWorkspace)
router.delete("/:id", workspaceController.deleteWorkspaceById);
router.patch("/:id", workspaceController.updateWorkspace);

module.exports = router;
