const express = require("express");

const workSpaceController = require("../controllers/workspaceController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.get("/", authenticate, workSpaceController.getAllWorkspaces);
router.post("/", authenticate, workSpaceController.createWorkspaceById);
router.delete("/:id", authenticate, workSpaceController.deleteWorkspaceById);
router.patch("/:id", authenticate, workSpaceController.updateWorkspace);
router.post("/", authenticate, workSpaceController.addMemberWorkspaceBy);

module.exports = router;
