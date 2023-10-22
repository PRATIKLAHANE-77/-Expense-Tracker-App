const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense", "root", "Pratik@123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
