const express=require('express');
const router = express.Router();
const purchasecontroller = require("../controller/purchasepremium");
const authenticatemiddleware = require("../middleware/auth");


router.get("/premiummembership", authenticatemiddleware.authenticate, purchasecontroller.purchasepremium)
router.post("/updatetransactionstatus", authenticatemiddleware.authenticate, purchasecontroller.updatetransactionstatus)

module.exports = router;


