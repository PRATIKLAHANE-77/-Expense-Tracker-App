const express=require('express');
const router = express.Router();
const forgotpassController = require("../controller/forgotpass");
const authenticatemiddleware = require("../middleware/auth");

router.post("/forgotpassword", forgotpassController.forgotPassword);
router.get('/resetpassword/:uuid',forgotpassController.resetPassword);
router.post('/updatepassword/:uuid',forgotpassController.updatePassword)

module.exports = router;