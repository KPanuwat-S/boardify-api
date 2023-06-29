const express = require("express");

const stripeController = require("../controllers/stripeController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/checkout", stripeController.checkout);
router.get("/payment", authenticate, stripeController.payment);

module.exports = router;
