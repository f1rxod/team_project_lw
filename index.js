const express = require('express')
const bp = require('body-parser')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const app = express()
const hashRounds = 10

mongoose.connect('mongodb://localhost:27017/admin', {useNewUrlParser:true})

const data = new mongoose.Schema({
    username:String,
    password:String,
    type:String,
    name_of_thing:String,
    faoliyat_turi:String,
    stir:String,
    email:String,
    location_of_thing:String,
    phone_number:String,
    passport:String,
    when:String,
    name:String,
    l_name:String,
    sharfi:String,
    living_adress:String,
    

})
const Data = mongoose.model('users', data)

app.use(express.static('public'))
app.use(bp.urlencoded({extended:true}))
app.set('view engine', 'ejs')

app.listen(3000, function(){
    console.log('On it...')
})
app.get('/', function(req,res){
    res.render('index')
})
app.post('/', function(req,res){
    var login = req.body.username
    var password = req.body.password
    Data.findOne({login:login}, function(err,result){
        if(result){
            bcrypt.compare(req.body.password, result.password, function(error, resullt) {
                if(resullt){
                    res.render('register_infrastructure')
                } else{
                    console.log('password is incorrect')
                }
            })
        } else{
            console.log('username doesnt exist')
        }
    })
})
app.get('/register',function(req,res){
    res.render('register')
})
app.post('/register', function(req,res){
    var username = req.body.username
    var password = req.body.password
    var confirm_password = req.body.confirm_password
    var type_subject = String(req.body.type)
    var name_of_thing = String(req.body.name_of_thing)
    var faoliyat_turi = String(req.body.faoliyat_turi)
    var stir = String(req.body.stir)
    var phone_number = String(req.body.phone_number)
    var email = String(req.body.email)
    var location_of_thing = String(req.body.location_of_thing)
    var passport = String(req.body.passport)
    var given_when = String(req.body.date_when)
    var name = String(req.body.name)
    var l_name = String(req.body.l_name)
    var sharfi = String(req.body.sharfi)
    var living_adress = String(req.body.living_adress)
    Data.findOne({username:username} && {phone_number:phone_number} && {email:email}, function(err,result){
        if(result){
            console.log('Person already Exist')
        }else{
            bcrypt.hash(req.body.password,hashRounds,function(err,hash){
                if(password === confirm_password){
                    const new_member = new Data({
                        username:username,
                        password:hash,
                        type:type_subject,
                        name_of_thing:name_of_thing,
                        faoliyat_turi:faoliyat_turi,
                        stir:stir,
                        email:email,
                        location_of_thing:location_of_thing,
                        phone_number:phone_number,
                        passport:passport,
                        when:given_when,
                        name:name,
                        sharfi:sharfi,
                        l_name:l_name,
                        living_adress:living_adress
                    })
                    new_member.save()
                    res.redirect('/')
                } else{
                    console.log('password is different')
                }
            })
        }
    })
})
app.delete('/delete', function(){
    Data.deleteMany(function(err){
        if(!err){
            console.log('Deleted')
        } else{
            console.log('Couldnt Deleted')
        }
    })
})