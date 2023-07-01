const express = require("express");

const memberController = require("../controllers/memberController");

const router = express.Router();

router.get("/searchUser", memberController.searchUser);
router.get("/searchAddMember", memberController.searchAddMember);
router.post("/addMember", memberController.addMember);
router.get("/getWorkspaceMember/:id", memberController.getWorkspaceMember);
router.delete("/deleteWorkspaceMember/:id", memberController.deleteWorkspaceMember);

module.exports = router;
