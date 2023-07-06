const express = require('express')
const Controller = require('../controller/controller')
const route = express.Router()

route.get('/', Controller.readLandingPage)

route.get('/users/register', Controller.registForm)
route.post('/users/register', Controller.postRegistForm)
route.get('/users/login', Controller.loginForm)
route.post('/users/login', Controller.postLoginForm)

route.get('/users/:id/menus', Controller.readAllMenus)
route.get('/users/:id/mycart', Controller.readMyCart)
route.get('/users/:id/profile', Controller.readMyProfile)
route.get('/users/:id/contactus', Controller.readContactUs)
route.get('/users/:id/logout', Controller.readUserLogout)

route.get('/users/:id/menu/:pr_id', Controller.readOneMenu)

module.exports = route