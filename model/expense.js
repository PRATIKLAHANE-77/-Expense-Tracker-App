const Sequelize = require("sequelize");
const sequelize = require("../util/SDatabase.js");

const expense = sequelize.define(
  "expenseTable",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true, // Corrected
    },

    amount: {
      type: Sequelize.INTEGER, // Corrected
      allowNull: false,
      // unique:true,
    },

    description: {
      type: Sequelize.STRING, // Corrected
      allowNull: false,
      // unique: true,
    },
    category: {
      type: Sequelize.STRING, // Corrected
      allowNull: false,
      // unique:true,
    },
  },
  {
    tableName: "expenseTable", // Specify the table name as 'model'
  }
);








module.exports = expense;

