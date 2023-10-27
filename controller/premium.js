const expense = require("../model/expense");
const user = require("../model/user");
const sequelize = require("../util/SDatabase");

// code is correct but not efficient way to write code
// exports.showleaderboard = async (req, res) => {
//     try {
//       const users = await user.findAll({attributes:['id', 'name']});

//       const results = [];

//       for (const data of users) {
//         const expenses = await expense.findAll({ where: { userId: data.id } });

//         let sum = 0;
//         expenses.forEach((abc) => {
//           sum += abc.amount;
//         });

//         results.push({ name: data.name, Total: sum });
//       }
//       console.log("results",results);
//       console.log(results[1].Total);

//       for (let i = 0; i < results.length - 1; i++) {
//         for (let j = 0; j < results.length - 1 - i; j++) {
//           if (results[j].Total < results[j + 1].Total) {
//             // Swap the elements
//             const temp = results[j];
//             results[j] = results[j + 1];
//             results[j + 1] = temp;
//           }
//         }
//       }
//       console.log("after sorting result = ", results);

//       res.status(201).json(results);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'An error occurred while fetching data' });
//     }
//   };

// one step best from above
// exports.showleaderboard = async (req, res) => {
//   try {
//    const users = await user.findAll({attributes:["name", "id"]});
// const expenses = await expense.findAll({attributes:["userId", "amount"]});
//     const userAggregatedExpenses = {};
//     expenses.forEach((expense) => {
//       if (userAggregatedExpenses[expense.userId]) {
//         userAggregatedExpenses[expense.userId] =
//           userAggregatedExpenses[expense.userId] + expense.amount;
//       } else {
//         userAggregatedExpenses[expense.userId] = expense.amount;
//       }
//     });
//     console.log("object = ", userAggregatedExpenses);
//     var userLeadershipBoardDetails = [];
//     users.forEach((user) => {
//       userLeadershipBoardDetails.push({
//         name: user.name,
//         total_cost: userAggregatedExpenses[user.id],
//       });
//     });
//     userLeadershipBoardDetails.sort((a, b) => b.total_cost - a.total_cost);
//     res.status(200).json(userLeadershipBoardDetails);
//     console.log(userLeadershipBoardDetails);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred while fetching data" });
//   }
// };

// two step best from above

// exports.showleaderboard = async (req, res) => {
//   try {
//     const userAggregatedExpenses = await user.findAll({
//       attributes: [
//         "name",
//         "id",
//         [sequelize.fn("sum", sequelize.col("amount")), "total_cost"],
//       ],
//       include: [
//         {
//           model: expense,
//           attributes: [],
//         },
//       ],
//       group: ["id"],
//       order: [[sequelize.col("total_cost"), "DESC"]],
//     });

//     res.status(200).json(userAggregatedExpenses);
//     console.log(userAggregatedExpenses);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred while fetching data" });
//   }
// };



/// last optimal solution

exports.showleaderboard = async (req,res) =>{
  const id = req.user.id;
console.log("check", req.user.id);
user.findOne({where:{id:id}}).then((data) =>{
  res.status(200).json({"Name" : data.name, "Total": data.Total});
  console.log("data", data);

})





}



