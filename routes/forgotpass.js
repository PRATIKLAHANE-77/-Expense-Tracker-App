const express=require('express');
const router = express.Router();
const forgotpassController = require("../controller/forgotpass");
const authenticatemiddleware = require("../middleware/auth");

router.post("/forgotpassword", forgotpassController.forgotPassword)

module.exports = router;