'use strict'

const { Profile, Customer, Order, Product, Category } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const path = require('path')
const { pointsChecker, currency, sum, date } = require('../helper/formatted')

class Controller {

    static readLandingPage(req, res){
        res.render('home',{root:path.join(__dirname + '../views')})
    }

    static registForm(req, res){
        const { invalid } = req.query;
        res.render('regist-form', { invalid });
    }

    static postRegistForm(req, res){
        const { username, email, password, name, gender, dateOfBirth, address} = req.body

        Profile.create({name, gender, dateOfBirth, address})
        .then((data) => {
            const ProfileId = data.id
            return Customer.create({username, email, password, ProfileId})
        })
        .then(() => res.redirect('/users/login'))
        .catch((err) => {
            if(err.name === `SequelizeValidationError`){
                err.errors = err.errors.map(el => el.message)
                res.redirect(`/users/register?invalid=${err.errors}`)
            }
            else {
                res.send(err)
            }
        })
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
        const cat = +req.query.cat
        const { userId } = req.session
        const { buy } = req.query

        Product.prodByCategory(cat)
        .then((data) => res.render('menus', {userId, data, currency, buy}))
        .catch((err) => res.send(err))
    }
    
    static readMyCart(req, res){
        const { userId } = req.session
        res.send('myCart')
    }

    static readMyProfile(req, res){
        const { userId } = req.session;
        const opt = {
          include: [
            {
              model: Customer,
              where: { ProfileId : userId }
            }
          ],
          where: { id : userId }
        };
        
        Profile.findOne(opt)
          .then(data => {
            // res.send(data)
            res.render('profile',{data, date, userId})
          })
          .catch(err => res.send(err));
    }

    static readContactUs(req, res){
        const { userId } = req.session;
        res.render('contactus', userId)
    }

    static readUserLogout(req, res){
        const { userId } = req.session;
        res.render('logout', {userId})
    }

    static readOneMenu(req, res){
        const { pr_id } = req.params
        const { userId } = req.session

        Product.findByPk(pr_id)
        .then((data) => res.render('buy-product', {id: userId, data, currency, userId}))
        .catch((err) => res.send(err))
    }

    static readPostOneMenu(req, res){
        const { pr_id } = req.params
        const { userId } = req.session
        const { total } = req.body

        Order.create({total, CustomerId: userId, ProductId: pr_id})
        .then(() => {
            return Product.findByPk(pr_id)
        })
        .then((data) => {
            res.redirect(`/menus?buy=${data.name}`)
        })
        .catch((err) => res.send(err))
    }

    static increaseQty(req, res){
        const { pr_id } = req.params
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
        const { userId } = req.session;
        const { del } =  req.query
        const id = userId;
        const opt = {
          include: [
            {
              model: Customer,
              where: { ProfileId: id },
              include: [Order]
            }
          ],
          where: { id }
        };
        
        Profile.findOne(opt)
          .then(data => {
            const { name } = data
            const {points} = data.Customer
            const orders = data.Customer.Orders
            res.render('checkout',{customer: { points }, orders, profile: { name }, sum, del, currency, userId})
          })
          .catch(err => res.send(err));
    }

    static checkedout(req, res) {
        const { userId } = req.session;
        const { chkout } = req.query
        const receivedPoints = pointsChecker(chkout)
        const opt = {
            where: {
              id: userId
            }
          }

        Customer.increment({ points : receivedPoints }, opt)
            .then(() => {
                Product.update({ qty: 0 }, {
                    where: { id: { [Op.gt]: 0 } }
                })
            })
            .then(() => {
              return Order.destroy({
                where: {
                  CustomerId: {
                    [Op.eq]: userId
                  }
                }
              })
            })
            .then(() => res.render('Sukses', { receivedPoints, userId }))
            .catch((err) => res.send(err))
    }

    static deleteTransaction(req, res) {
        const { orderId } = req.params
        const opt = {
            where: {
                orderId : orderId
            }
        }
        let del = ``

        Order.findOne(opt)
        .then((data) => {
            del = data
            return Order.destroy({
                where: { orderId }
              })
        })
        .then(() => res.redirect(`/checkout?del=${orderId}`))
        .catch((err) => res.send(err))
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/')
    }


}

module.exports = Controller