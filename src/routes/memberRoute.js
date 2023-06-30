const express = require("express");

const memberController = require("../controllers/memberController");

const router = express.Router();

router.get("/searchUser", memberController.searchUser);
router.get("/searchAddMember", memberController.searchAddMember);
router.get("/getWorkspaceMember", memberController.getWorkspaceMember);
router.post("/addMember", memberController.addMember);

module.exports = router;
