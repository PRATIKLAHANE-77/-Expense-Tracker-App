
// without pagination
// const { where } = require("sequelize");
// const expense = require("../model/expense");
// const USER = require("../model/user");
// const { use } = require("../routes/user");
// const sequelize = require("../util/SDatabase");
// const { response } = require("express");

// // if we create a table with expenses and if user table total update not working then in that case in screen expenses showing but that is not matching with user Total value so it is not correted version of app//
// // exports.addexpense = async (req, res) => {
// //   const { amount, description, category } = req.body;
// //   const totalexpense = Number(req.user.Total) + Number(amount);
// //   const user = req.user;
// //   // console.log("final ans ", user);
// //   const userId = user.id;
// //    USER.update({ Total: totalexpense }, {
// //     where: { id: userId } // Specify the user to update based on their ID
// //   });
// //   const newUser = expense.create({
// //     amount,
// //     description,
// //     category,
// //     userId,
// //   });
// //   res.status(201).json(req.body);
// // };

// // exports.addexpense = async (req, res) => {
// //   const t =await sequelize.transaction();
// //   const user = req.user;
// //   const userId = user.id;
// //   const { amount, description, category } = req.body;
// //   expense.create({amount,description,category,userId,}
// //     ,{transaction:t}).then((expense)=>{
// //     const totalexpense = Number(req.user.Total) + Number(amount);
// //      USER.update({ Total: totalexpense }, {
// //       where: { id: userId },
// //        transaction:t // Specify the user to update based on their ID
// //     }).then(async()=>{
// //       await t.commit();
// //       res.status(201).json({expense:expense});

// //     }).catch(async(err)=>{
// //       await t.rollback();
// //       return res.status(500).json({success:false, error:err});
// //     })

// //   }).catch(async(err)=>{
// //     await t.rollback();
// //     return res.status(500).json({success:false, error:err});
// //   })

// // };

// exports.addexpense = async (req, res) => {
//   const t = await sequelize.transaction();
//   try {
//     const user = req.user;
//     const userId = user.id;
//     const { amount, description, category } = req.body;
//     const newExpense = await expense.create(
//       { amount, description, category, userId },
//       { transaction: t }
//     );

//     const totalexpense = Number(req.user.Total) + Number(amount);
//     const update = await USER.update(
//       { Total: totalexpense },
//       {
//         where: { id: userId },
//         transaction: t, // Specify the user to update based on their ID
//       }
//     );
//     await t.commit();
//     res.status(201).json({ expense: newExpense });
//   } catch (err) {
//     await t.rollback();
//     res.status(500).json({ success: false, error: err });
//   }
// };

// //original
// // exports.deleteExpenses = async(req, res) => {
// //   const id = req.params.id;
// //   const user = req.user;
// //   const userId = user.id;

// //   console.log(id);
// //   const data = await expense.findOne({where :{id:id, userId:userId}});
// //   console.log("data amount is = ", data.amount);
// //   const totalexpense = Number(req.user.Total) - Number(data.amount);
// //   const update = await  USER.update({ Total: totalexpense }, {
// //     where: { id: userId },
// //   });
// //   const deldata = await expense.destroy({ where: { id: id, userId: userId } });
// //     res.status(200).json("sucessfully deleted the data");

// // };

// // tring to add transaction method

// exports.deleteExpenses = async (req, res) => {
//   const t = await sequelize.transaction();
//   try {
//     const id = req.params.id;
//     const user = req.user;
//     const userId = user.id;
//     console.log(id);

//     const data = await expense.findOne({
//       where: { id: id, userId: userId },
//       transaction: t,
//     });
//     const totalexpense = Number(user.Total) - Number(data.amount);

//     // First, delete the expense record
//     const deldata = await expense.destroy({
//       where: { id: id, userId: userId },
//       transaction: t,
//     });

//     // Update the user's Total after the expense is deleted
//     const update = await USER.update(
//       { Total: totalexpense },
//       { where: { id: userId }, transaction: t }
//     );

//     // Commit the transaction after both delete and update are successful
//     await t.commit();

//     console.log("data amount is = ", data.amount);

//     // Send the success response after the transaction is committed
//     res.status(200).json("Successfully deleted the data");
//   } catch (err) {
//     // Rollback the transaction in case of an error
//     await t.rollback();
//     res.status(500).json({ success: false, error: err });
//   }
// };

// exports.getallexpenses = (req, res) => {
//   const user = req.user;
//   expense
//     .findAll({ where: { userId: user.id } })
//     .then((userData) => {
//       console.log(userData);
//       res.status(200).json({ userData });
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//       res.status(500).send("Internal Server Error");
//     });
// };

// // exports.getallexpenses = async (req, res) => {
// //   const user = req.user;
// //   // console.log("value of user is = ", user.id);
// //   const Usercheck =  await USER.findOne({where:{id:user.id}});
// //   // console.log("IS PRIME CHECK = ", Usercheck.ispremiumuser);
// //   const Expense =  await  expense.findAll({ where: { userId: user.id } });
// //     await Promise.all([Usercheck, Expense])
// //       const ispremiumuser = Usercheck.ispremiumuser;
// //      console.log("IS PRIME CHECK = ", Usercheck.ispremiumuser);
// //      console.log("expense = ", Expense);
// //       res.status(200).json({ispremiumuser:ispremiumuser, expense:Expense})

// // };




// with pagination
const { where } = require("sequelize");
const expense = require("../model/expense");
const USER = require("../model/user");
const { use } = require("../routes/user");
const sequelize = require("../util/SDatabase");
const { response } = require("express");

// if we create a table with expenses and if user table total update not working then in that case in screen expenses showing but that is not matching with user Total value so it is not correted version of app//
// exports.addexpense = async (req, res) => {
//   const { amount, description, category } = req.body;
//   const totalexpense = Number(req.user.Total) + Number(amount);
//   const user = req.user;
//   // console.log("final ans ", user);
//   const userId = user.id;
//    USER.update({ Total: totalexpense }, {
//     where: { id: userId } // Specify the user to update based on their ID
//   });
//   const newUser = expense.create({
//     amount,
//     description,
//     category,
//     userId,
//   });
//   res.status(201).json(req.body);
// };

// exports.addexpense = async (req, res) => {
//   const t =await sequelize.transaction();
//   const user = req.user;
//   const userId = user.id;
//   const { amount, description, category } = req.body;
//   expense.create({amount,description,category,userId,}
//     ,{transaction:t}).then((expense)=>{
//     const totalexpense = Number(req.user.Total) + Number(amount);
//      USER.update({ Total: totalexpense }, {
//       where: { id: userId },
//        transaction:t // Specify the user to update based on their ID
//     }).then(async()=>{
//       await t.commit();
//       res.status(201).json({expense:expense});

//     }).catch(async(err)=>{
//       await t.rollback();
//       return res.status(500).json({success:false, error:err});
//     })

//   }).catch(async(err)=>{
//     await t.rollback();
//     return res.status(500).json({success:false, error:err});
//   })

// };

exports.addexpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const user = req.user;
    const userId = user.id;
    const { amount, description, category } = req.body;
    const newExpense = await expense.create(
      { amount, description, category, userId },
      { transaction: t }
    );

    const totalexpense = Number(req.user.Total) + Number(amount);
    const update = await USER.update(
      { Total: totalexpense },
      {
        where: { id: userId },
        transaction: t, // Specify the user to update based on their ID
      }
    );
    await t.commit();
    res.status(201).json({ expense: newExpense });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ success: false, error: err });
  }
};

//original
// exports.deleteExpenses = async(req, res) => {
//   const id = req.params.id;
//   const user = req.user;
//   const userId = user.id;

//   console.log(id);
//   const data = await expense.findOne({where :{id:id, userId:userId}});
//   console.log("data amount is = ", data.amount);
//   const totalexpense = Number(req.user.Total) - Number(data.amount);
//   const update = await  USER.update({ Total: totalexpense }, {
//     where: { id: userId },
//   });
//   const deldata = await expense.destroy({ where: { id: id, userId: userId } });
//     res.status(200).json("sucessfully deleted the data");

// };

// tring to add transaction method

exports.deleteExpenses = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const id = req.params.id;
    const user = req.user;
    const userId = user.id;
    console.log(id);

    const data = await expense.findOne({
      where: { id: id, userId: userId },
      transaction: t,
    });
    const totalexpense = Number(user.Total) - Number(data.amount);

    // First, delete the expense record
    const deldata = await expense.destroy({
      where: { id: id, userId: userId },
      transaction: t,
    });

    // Update the user's Total after the expense is deleted
    const update = await USER.update(
      { Total: totalexpense },
      { where: { id: userId }, transaction: t }
    );

    // Commit the transaction after both delete and update are successful
    await t.commit();

    console.log("data amount is = ", data.amount);

    // Send the success response after the transaction is committed
    res.status(200).json("Successfully deleted the data");
  } catch (err) {
    // Rollback the transaction in case of an error
    await t.rollback();
    res.status(500).json({ success: false, error: err });
  }
};

exports.getallexpenses = (req, res) => {
  const user = req.user;
  expense
    .findAll({ where: { userId: user.id } })
    .then((userData) => {
      console.log(userData);
      res.status(200).json({ userData });
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


// exports.getExpenses=async (req,res)=>{
//   try {
//       const page = Number(req.query.page) || 1;
//       const itemsPerPage= Number(req.query.expensePerPage);
//       console.log(itemsPerPage)
  
//       const user = req.user;
//       console.log("user", user);
      
  
//       const expenses = await expense.findAll({
//         where: {
//           userId: user.id, // Replace 'userId' with the actual column name for the user ID
//         },
//         offset: (page - 1) * itemsPerPage,
//         limit: itemsPerPage
//       });

//       const Expenses = await expense.findAll({
//         where: {
//           userId: user.id, // Replace 'userId' with the actual column name for the user ID
//         },
//       });
      
//       console.log("expenses,",  expenses);
  
//       // total count of expenses of the user
//       const totalCount = await Expenses.length;

//       console.log("totalcount", totalCount);
  
//       const lastPage = Math.ceil(totalCount / itemsPerPage);

//       console.log("lastpage", lastPage);
  
//       res.status(200).json({
//         expenses:expenses,
//         pagination:{
//           currentPage: page,
//           hasNextPage: page < lastPage-1,
//           nextPage: page + 1,
//           hasPreviousPage: page > 1,
//           previousPage: page - 1,
//           lastPage:lastPage

//         }
        
//       });
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to retrieve expenses' });
//     }
//   }



exports.getExpenses = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const itemsPerPage = Number(req.query.expensePerPage);

    const user = req.user;

    const expenses = await expense.findAll({
      where: {
        userId: user.id, // Replace 'userId' with the actual column name for the user ID
      },
      offset: (page - 1) * itemsPerPage,
      limit: itemsPerPage
    });

    const totalCount = await expense.count({
      where: {
        userId: user.id,
      },
    });

    const lastPage = Math.ceil(totalCount / itemsPerPage);

    res.status(200).json({
      expenses: expenses,
      pagination: {
        currentPage: page,
        hasNextPage: itemsPerPage * page < totalCount,
        nextPage:page + 1,
        hasPreviousPage: page > 1,
        previousPage: page - 1,
        lastPage: lastPage
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve expenses' });
  }
}

