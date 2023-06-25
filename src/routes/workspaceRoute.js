const express = require("express");

const workSpaceController = require("../controllers/workspaceController");
const router = express.Router();

router.get("/:userId", workSpaceController.getAllWorkspaces);

module.exports = router;
