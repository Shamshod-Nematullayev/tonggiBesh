const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name : String,
    mail : String,
    password : String
});

const User = mongoose.model('Users');

router.post('/users/kirish.js', (req, res) => {
async  function loginUser(){
        const users = await User.find();

        users.forEach((elem)=>{
            if(elem.mail === req.body.email && elem.password === req.body.password){
                res.send('<h1>Hush kelibsiz</h1>');
            }else{
                res.send('Login yoki parol noto\'g\'ri') 
            }
        })
    }
    loginUser()
})

module.exports = router;