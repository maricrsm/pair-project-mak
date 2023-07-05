# pair-project-mak

npx sequelize-cli model:generate --name Profile --attributes name:string,gender:string,dateOfBirth:date,address:string

npx sequelize-cli model:generate --name Customer --attributes username:string,email:string,password:string,points:integer,ProfileId:integer

npx sequelize-cli model:generate --name Order --attributes orderId:string,total:integer,dateOfBirth:date,address:string

npx sequelize-cli model:generate --name Product --attributes name:string,price:integer,qty:integer,img:string,CategoryId:integer

npx sequelize-cli model:generate --name Category --attributes name:string

npx sequelize db:drop && npx sequelize db:create && npx sequelize db:migrate && npx sequelize db:seed:all

=== many-to-many ===
melalui table conjugtion dimana dia menampung foreign key dari 2 table yg berbeda.

table conjugtion menampung 1 foreign key dari 1 table -> new migration addColumn untuk foreign key dari table yg berbeda,
jadi table conjugtion menampung 2 foreign key   (migrate 3 table + 1 add column), 
dibagian table jgn lupa tambahkan association 
ex:
di model Profile static assosiation -> 
Profile.hasOne(models.User)
Profile.hasMany(models.ProfileProduct)
Profile.belongsToMany(models.Product, {through : models.ProfileProduct})

di model Product
Product.hasMany(models.ProfileProduct)
Product.belongsToMany(models.Profile, {through : models.ProfileProduct})

di model ProfileProduct (associate kyk biasa)
ProfileProduct.belongsTo(models.Profile)
ProfileProduct.belongsTo(models.Product)

=== bycriptjs ===
func:
- hashsync -> untuk enkripsi data       // ex: const hash = bycriptjs.hashSync("text", salt)
- gensaltsync   -> untuk men-generate salt-nya  //ex: const salt = bycriptjs.genSaltSync(10)    
//makin besar angka makin sulit di dekskipsi

jadi kalo mau enkripsi data pake hashSync sm genSaltSync
ex:
const bycriptjs = require('bycriptjs');

const salt = bycriptjs.genSaltSync(10)
const hash = bycriptjs.hashSync("password", salt)

- comparesync   -> untuk memeriksa apakan plain text merupakan hasil dari enkripsi, hasil akan return boolean
ex:
const bycriptjs = require('bycriptjs');

const salt = bycriptjs.genSaltSync(10)
const hash = bycriptjs.hashSync("password", salt)
bycriptjs.compareSync("password", hash)


=== Middleware ===

1. Hash password:
    - bycriptjs

2. Authentication:
    - middleware -> bawaan dari express
    - session   -> npm i express-session

algoritma: 
- register (bycript di password)
- login (compare password pake bycriptjs)
- pake middleware + session untuk authentication login (uda/belom)
- pake middleware + session untuk authentication role (optional)


