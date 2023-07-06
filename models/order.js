'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Customer)
      Order.belongsTo(models.Product)
    }


  }
  Order.init({
    orderId: DataTypes.STRING,
    total: DataTypes.INTEGER,
    CustomerId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });

  Order.beforeCreate((init) => {
    const date = new Date().getTime()
    init.orderId = `${init.CustomerId}-${date}`
  })

  return Order;
};