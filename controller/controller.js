'use strict'

const { Profile, Customer, Order, Product, Category } = require('../models')
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs');
const { formatBcryptjs } = require('../helper/formatted')

class Controller {

    static readLandingPage(req, res){
        res.render('landing-page')
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
                username: {[Op.eq] : username},
                // password: {[Op.eq] : valid}
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
                else res.redirect(`/users/${data.id}/menus`)
             }
        })
        .catch((err) => res.send('keluar om'))
    }

    static readAllMenus(req, res){
        const { id } = req.params

        res.render('menus', {id})
    }
    
    static readMyCart(req, res){
        const { id } = req.params
        res.send('myCart')
    }

    static readMyProfile(req, res){
        const { id } = req.params
        res.send('My Profile')
    }

    static readContactUs(req, res){
        const { id } = req.params
        res.send('Contact Us')
    }

    static readUserLogout(req, res){
        const { id } = req.params
        res.send('logout')
    }

    static readOneMenu(req, res){
        // const { id, }
    }

    static createBuy


}

module.exports = Controller