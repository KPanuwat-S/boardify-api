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
router.post("/", workSpaceController.addMemberWorkspaceById);
router.get("/countMemberWorkspace/:id", workSpaceController.countMemberWorkspace)
router.delete("/:id", workSpaceController.deleteWorkspaceById);
router.patch("/:id", workSpaceController.updateWorkspace);

module.exports = router;
