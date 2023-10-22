const { where } = require("sequelize");
const expense = require("../model/expense");

exports.addexpense = (req, res) => {
  const { amount, description, category } = req.body;
  const user = req.user;
  // console.log("final ans ", user);
  const userId = user.id;
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
      res.status(200).json(userData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).send("Internal Server Error");
    });
};
