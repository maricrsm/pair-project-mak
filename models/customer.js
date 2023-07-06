'use strict';

const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
const { formatBcryptjs } = require('../helper/formatted');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsTo(models.Profile)
      Customer.hasMany(models.Order)
      Customer.belongsToMany(models.Product, {through : models.Order})
    }
  }
  Customer.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    points: DataTypes.INTEGER,
    ProfileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Customer',
  });

  Customer.beforeCreate((init) => {
    init.password = formatBcryptjs(init.password)
  })

  return Customer;
};