'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.Customer)
    }

    get title(){
      switch(this.gender){
        case 'Female':
          return `Ms. ${this.name}`
        case 'Male':
          return `Mr. ${this.name}`
      }
    }
  }
  Profile.init({
    name: {
      type: DataTypes.STRING,
      isAlpha: true,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: `please insert your name`
        },
        notNull: {
          msg : `please insert your name`
        },
        wordsLength(val){
          const words = val.split(' ')
          if(words.length < 2){
            throw new Error('Input name minimum 2 words')
          }
        }
      }
    },
    gender:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: `please insert your gender`
        },
        notNull: {
          msg : `please insert your gender`
        }
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: `please insert your birth`
        },
        notNull: {
          msg : `please insert your birth`
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: `please insert your name`
        },
        notNull: {
          msg : `please insert your name`
        },
        len: {
          args: [2, 150],
          msg: ('address input is 2 characters minimum')
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });


  return Profile;
};