const express=require('express');
const router = express.Router();
const premiumController = require("../controller/premium");
const authenticatemiddleware = require("../middleware/auth");

router.get("/showleaderboard", authenticatemiddleware.authenticate, premiumController.showleaderboard)

module.exports = router;