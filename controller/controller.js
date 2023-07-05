'use strict'

class Controller {

    static readLandingPage(req, res){
        res.render('landing-page')
    }

    static addNewUser(req, res){
        res.render('regist-form')
    }

    static addedNewUser(req, res){
        console.log(req.body);
        res.redirect('/menus')
    }

    static readAllMenus(req, res){
        res.render('menus')
    }

    static readAllCategories(req, res){
        res.send('Categories')
    }

    static readMyCart(req, res){
        res.send('myCart')
    }

    // static readAllMenus(req, res){

    // }

}

module.exports = Controller