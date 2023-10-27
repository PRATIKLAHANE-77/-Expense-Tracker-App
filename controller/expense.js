const { where } = require("sequelize");
const expense = require("../model/expense");
const USER = require("../model/user");
const { use } = require("../routes/user");
exports.addexpense = async (req, res) => {
  const { amount, description, category } = req.body;
  const totalexpense = Number(req.user.Total) + Number(amount);
  const user = req.user;
  // console.log("final ans ", user);
  const userId = user.id;
  await USER.update({ Total: totalexpense }, {
    where: { id: userId } // Specify the user to update based on their ID
  });
  const newUser = expense.create({
    amount,
    description,
    category,
    userId,
  });
  res.status(201).json(req.body);
};

exports.deleteExpenses = (req, res) => {
  // const id = req.body.id;
  const id = req.params.id;
  const user = req.user;
  const userId = user.id;

  console.log(id);
  expense.destroy({ where: { id: id, userId: userId } }).then((result) => {
    res.status(200).json("sucessfully deleted the data");
  });
};

exports.getallexpenses = (req, res) => {
  const user = req.user;
  expense
    .findAll({ where: { userId: user.id } })
    .then((userData) => {
      console.log(userData);
      res.status(200).json({userData});
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).send("Internal Server Error");
    });
};

// exports.getallexpenses = async (req, res) => {
//   const user = req.user;
//   // console.log("value of user is = ", user.id);
//   const Usercheck =  await USER.findOne({where:{id:user.id}});
//   // console.log("IS PRIME CHECK = ", Usercheck.ispremiumuser);
//   const Expense =  await  expense.findAll({ where: { userId: user.id } });
//     await Promise.all([Usercheck, Expense])
//       const ispremiumuser = Usercheck.ispremiumuser;
//      console.log("IS PRIME CHECK = ", Usercheck.ispremiumuser);
//      console.log("expense = ", Expense);
//       res.status(200).json({ispremiumuser:ispremiumuser, expense:Expense})
  
// };
