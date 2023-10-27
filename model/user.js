const Sequelize = require("sequelize");
const sequelize = require("../util/SDatabase.js");


const user = sequelize.define(
  "model",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true, // Corrected
    },

    name: {
      type: Sequelize.STRING, // Corrected
      allowNull: false,
      // unique:true,
    },

    email: {
      type: Sequelize.STRING, // Corrected
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING, // Corrected
      allowNull: false,
      // unique:true,
    },
    ispremiumuser: {
      type:Sequelize.BOOLEAN,
      allowNull:true,
    },
    Total: {
      type:Sequelize.INTEGER,
      defaultValue:0,
    }
  },
  {
    tableName: "model", // Specify the table name as 'model'
  }
);






module.exports = user;

