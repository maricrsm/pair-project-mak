const express = require('express')
const Controller = require('../controller/controller')
const session = require('express-session')
const route = express.Router()

const coba = (req, res, next) => {

}

route.get('/', Controller.readLandingPage)

route.get('/users/register', Controller.registForm)
route.post('/users/register', Controller.postRegistForm)
route.get('/users/login', Controller.loginForm)
route.post('/users/login', Controller.postLoginForm)

route.use((req, res, next) => {
    // console.log(req.session.userId, "Middleware");
    if(req.session.userId) next()
    else {
        const validation = 'Please Sign in or Register first'
        res.redirect('/')
        // res.redirect(`/?invalid=${validation}`)
    }
})

route.get('/menus', Controller.readAllMenus)
route.get('/mycart', Controller.readMyCart)
route.get('/profile', Controller.readMyProfile)
route.get('/contactus', Controller.readContactUs)
route.get('/loggingout', Controller.readUserLogout)
route.get('/logout', Controller.logout)

route.get('/checkout', Controller.readCheckout)
route.get('/checkout-transaction', Controller.checkedout)
route.get('/product/:pr_id', Controller.readOneMenu)
route.post('/product/:pr_id', Controller.readPostOneMenu)
route.get('/product/:pr_id/incr', Controller.increaseQty)
route.get('/product/:pr_id/decr', Controller.decreaseQty)
route.get('/checkout/:orderId/delete', Controller.deleteTransaction)


module.exports = route