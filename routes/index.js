const express = require('express')
const Controller = require('../controller/controller')
const route = express.Router()

route.get('/', Controller.readLandingPage)
route.get('/users/register', Controller.addNewUser)
route.post('/users/register', Controller.addedNewUser)
route.get('/menus', Controller.readAllMenus)
route.get('/categories', Controller.readAllCategories)
route.get('/mycart', Controller.readMyCart)

module.exports = route