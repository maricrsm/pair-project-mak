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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `username cannot be empty`
        },
        notEmpty: {
          msg: `username cannot be empty`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `email cannot be empty`
        },
        notEmpty: {
          msg: `email cannot be empty`
        },
        isEmail: {
          msg: `please input your email`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `password cannot be empty`
        },
        notEmpty: {
          msg: `password cannot be empty`
        }
      }
    },
    points: DataTypes.INTEGER
    ,
    role: DataTypes.STRING
    ,
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