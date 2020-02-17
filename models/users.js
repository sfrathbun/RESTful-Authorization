'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    LastName: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    Email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }, 
    Username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    Admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};