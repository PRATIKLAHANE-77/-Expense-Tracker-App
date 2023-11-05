const express = require("express");
const router = express.Router();
const userauthenticate = require("../middleware/auth");

const expensecontroller = require("../controller/expense");

router.post("/addexpense",userauthenticate.authenticate, expensecontroller.addexpense);
router.get("/getall",userauthenticate.authenticate ,expensecontroller.getallexpenses);
// router.delete("/deldata", userauthenticate.authenticate, expensecontroller.deleteExpenses);
router.delete("/deldata/:id", userauthenticate.authenticate, expensecontroller.deleteExpenses);
router.get('/get-expenses', userauthenticate.authenticate,expensecontroller.getExpenses)



module.exports = router;
