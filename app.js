const express = require("express");
const app = express();
const sequelize = require("./util/SDatabase");
const userRoute = require("./routes/user");
const expenseRoute = require("./routes/expense");
const purchaseRoute = require("./routes/purchase");
const premiumRoute = require("./routes/premium");
const expense = require("./model/expense");
const user = require("./model/user");
const Order = require("./model/order");
const cors = require("cors"); 

app.use(express.json({ extended: true }));

app.use(cors());

user.hasMany(expense, { foreignKey: "userId" }); // User can have many expenses
expense.belongsTo(user, { foreignKey: "userId" }); // An expense belongs to one user


app.use("/user", userRoute);
app.use("/expense", expenseRoute);
app.use("/purchase",purchaseRoute);
app.use("/premium",premiumRoute);

user.hasMany(Order);
Order.belongsTo(user);


sequelize
  .sync()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log("Database synchronization error:", err);
  });
