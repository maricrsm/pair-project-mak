'use strict';
const {
  Model
} = require('sequelize');
const { formatBcryptjs, currency } = require('../helper/formatted')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category)
      Product.hasMany(models.Order)
      Product.belongsToMany(models.Customer, {through : models.Order})
    }

    totalPayment(qty, price){
      return qty * price
    }

    get currency(){
      return currency(this.price)
    }


  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    qty: {
      type: DataTypes.INTEGER,
      validate:{
        min: 0
      }
    },
    img: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};