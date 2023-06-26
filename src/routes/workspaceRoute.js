const express = require("express");

const workSpaceController = require("../controllers/workspaceController");
const router = express.Router();

router.get("/:userId", workSpaceController.getAllWorkspaces);
router.get("/members/:workspaceId", workSpaceController.getAllMemberInWorkspace)
router.get("/workspace/:workspaceId", workSpaceController.getWorkspaceById)
module.exports = router;
