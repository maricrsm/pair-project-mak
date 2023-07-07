'use strict';

const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
const { formatBcryptjs } = require('../helper/formatted');
const nodemailer = require('nodemailer');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasOne(models.Profile)
      Customer.hasMany(models.Order)
      Customer.belongsToMany(models.Product, {through : models.Order})
    }

    statusMembership(val){
      if(val > 35){
        return `Gold`
      }else if(val > 15){
        return 'Silver'
      }else if(val >= 0){
        return 'Bronze'
      }
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

  Customer.afterCreate((init) => {
    // Set up the Ethereal Email transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'al3@ethereal.email',
          pass: '1QGH1eZ7rgYdrmGUTD'
      }
  });

    // Define the email options
    const mailOptions = {
      from: 'al3@ethereal.email',
      to: `${init.email}`,
      subject: 'Your profile has been made',
      text: `Thank you for joining our membership user ${init.username}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });

  return Customer;
};