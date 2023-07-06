const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const session = require('express-session')

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/cssFiles', express.static(__dirname + '/views'))

app.use(session({
  secret: 'rahasia',  //semacam password untuk session
  resave: false,
  saveUninitialized: false,  //untuk save user" yg masuk ke server walaupun belom login
  cookie: { secure: false,  //https
            sameSite : true } //untuk security dari crsf attack
}))

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})