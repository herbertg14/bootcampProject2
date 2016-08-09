'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING(40)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Users;
};
