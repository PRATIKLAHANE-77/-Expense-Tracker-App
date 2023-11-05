const Sequelize=require('sequelize');
const sequelize=require('../util/SDatabase');

const forgotPassword=sequelize.define('forgotPassword',{
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      isActive: {
        type:Sequelize.BOOLEAN,
        allowNull: false,
      },
    })
    
  
  module.exports = forgotPassword



