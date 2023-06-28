const express = require("express");

const workSpaceController = require("../controllers/workspaceController");
const router = express.Router();

router.get("/", workSpaceController.getAllWorkspaces);
router.get("/workspace/:workspaceId", workSpaceController.getOneWorkSpace);
router.get(
  "/members/:workspaceId",
  workSpaceController.getAllMembersInWorkspace
);
router.post("/", workSpaceController.createWorkspaceById);
router.delete("/:id", workSpaceController.deleteWorkspaceById);
router.patch("/:id", workSpaceController.updateWorkspace);
router.post("/", workSpaceController.addMemberWorkspaceById);

module.exports = router;
