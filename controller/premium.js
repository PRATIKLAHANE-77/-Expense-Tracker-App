const expense = require("../model/expense");
const user = require("../model/user");

// exports.showleaderboard = (req, res) => {
//   user.findAll().then((ans) => {
//     let sum = 0;
//     ans.forEach((data) => {
//       expense.findAll({ where: { userId: data.id } }).then((abc) => {
//         sum = sum + abc.amount;
//       });
//       let obj = { name: data.name, Total: sum };
//       res.status(201).json({ name: data.name, Total: sum });
//     });
//   });
// };

exports.showleaderboard = async (req, res) => {
    try {
      const users = await user.findAll();
  
      const results = [];
  
      for (const data of users) {
        const expenses = await expense.findAll({ where: { userId: data.id } });
  
        let sum = 0;
        expenses.forEach((abc) => {
          sum += abc.amount;
        });
  
        results.push({ name: data.name, Total: sum });
      }
      console.log("results",results);
      console.log(results[1].Total);

      for(let i = 0;i<results.length-1;i++) {
        if((results[i].Total)<(results[i+1].Total)) {
            let temp = results[i];
            results[i] = results[i+1];
            results[i+1] = temp;

        }

      }
      console.log("after sorting result = ", results);
  
      res.status(201).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  };
  
