'use strict'

const { Profile, Customer, Order, Product, Category } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const path = require('path')

class Controller {

    static readLandingPage(req, res){
        res.render('home', {root:path.join(__dirname + '../views')})
    }

    static registForm(req, res){
        res.render('regist-form')
    }

    static postRegistForm(req, res){
        const { username, email, password, name, gender, dateOfBirth, address} = req.body

        Profile.create({name, gender, dateOfBirth, address})
        .then((data) => {
            const ProfileId = data.id
            return Customer.create({username, email, password, ProfileId})
        })
        .then(() => res.redirect('/users/login'))
        .catch((err) => res.send(err))
    }

    static loginForm(req, res){
        const { usrerr } = req.query
        res.render('login-form', {usrerr})
    }

    static postLoginForm(req, res){
        const { username, password } = req.body
        let opt = {
            where: {
                username: {[Op.eq] : username}
            }
        }

        Customer.findOne(opt)
        .then((data) => {
            if(!data) {
                res.redirect('/users/login?usrerr=invalid%20username')
            }
            else {
                const validPassword = bcrypt.compareSync(password, data.password)
                if(!validPassword) res.redirect('/users/login?usrerr=invalid%20password')
                else {
                    req.session.userId = data.id
                    console.log(req.session, 'SESSION');
                    res.redirect(`/menus`)}
             }
        })
        .catch((err) => res.send('keluar om'))
    }

    static readAllMenus(req, res){
        const { userId } = req.session

        Product.findAll()
        .then((data) => res.render('menus', {userId, data}))
        .catch((err) => res.send(err))
    }
    
    static readMyCart(req, res){
        const { userId } = req.session
        res.send('myCart')
    }

    static readMyProfile(req, res){
        const { userId } = req.session
        res.send('My Profile')
    }

    static readContactUs(req, res){
        const { userId } = req.session
        res.send('Contact Us')
    }

    static readUserLogout(req, res){
        const { userId } = req.session
        res.send('logout')
    }

    static readOneMenu(req, res){
        const { pr_id } = req.params
        const { userId } = req.session

        Product.findByPk(pr_id)
        .then((data) => res.render('buy-product', {id: userId, data}))
        .catch((err) => res.send(err))
    }

    static readPostOneMenu(req, res){
        const { pr_id } = req.params
        const { userId } = req.session
        const { total } = req.body

        // res.send( {pr_id, sess: req.session, total})
        Order.create({total, CustomerId: userId, ProductId: pr_id})
        .then((data) => res.redirect(`/menus`))
        .catch((err) => res.send(err))
    }

    static increaseQty(req, res){
        const { pr_id } = req.params
        const { userId } = req.session
        const opt = {
            where: {id : {[Op.eq]: pr_id}}
          }
        
        Product.increment({ qty: 1 }, opt)
        .then(() => res.redirect(`/product/${pr_id}`))
        .catch((err) => res.send(err))
    }

    static decreaseQty(req, res){
        const { pr_id } = req.params
        const opt = {
            where: {id : {[Op.eq]: pr_id}}
          }
        
        Product.increment({ qty: -1 }, opt)
        .then(() => res.redirect(`/product/${pr_id}`))
        .catch((err) => res.send(err)) 
    }


    static readCheckout(req, res){
        const { userId } = req.session
        const opt = {
            include: [
              {
                model: Customer,
                where: { ProfileId: userId },
                include: [Order] // Include the Order model
              }
            ],
            where: { id: userId }
          }
        //   console.log(id);
        // ,
            
        Profile.findAll(opt)
        .then(data => res.send(data))
        .catch(err => res.send(err))
    }

    // static createOrder(req, res){
    //     const { id } = req.session

    // }


}

module.exports = Controller