const express = require("express");

const wokeSpaceController = require("../controllers/workSpaceController");

const router = express.Router();

router.get("/workspace", wokeSpaceController.getAllBaords);

module.exports = router;
