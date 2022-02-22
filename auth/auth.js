const e = require('express');
const mongoose = require('mongoose');
// DB ga ulanish qismi 
// mongoose.connect('mongodb+srv://tonggibesh:rich1234@cluster0.bsq80.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser : true,
//     useUnifiedTopology : true
// })

mongoose.connect('mongodb://127.0.0.1/test')
.then(()=>{
    console.log('connection mongodb...');
}) 
.catch(e=>{
    console.log('error connection mongo', e);
})

const usersSchema = new mongoose.Schema({
    name : String,
    mail : String,
    password : String
});

const Users = mongoose.model('Users', usersSchema);
exports.register =async (req, res) =>{

    // User qo'shish algoritmi


    const user = new Users({
        name : req.body.name,
        mail : req.body.email,
        password : req.body.password
    })
    
    const newUser =  await user.save();
    res.send(newUser).end()

}

exports.login =async (req, res) => {
    const {email, password} = req.body;
    const users = await Users.find({mail: email, password : password}).exec();
    if(!email || !password){
        return res.send('Please enter password and email <a href="/kirish.html">login</a>')
    }else if(users.length < 1){
        return res.send('kirish malumotlari noto\'g\'ri')
    }else{

        res.render('index', {username : users[0].name})
    }
}

