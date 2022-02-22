const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');
const path = require('path');



router.post('/auth/register', auth.register);
router.post('/auth/login', auth.login);
router.post('/auth/sendMessage', (req, res) =>{
    const message = req.body.message;
    res.render('chat', {message : message})
});
router.get('/auth/chat.html', (req, res)=> {
    res.render('chat')
})
router.get('/auth/css/style.css', (req, res)=> {
    res.sendFile(path.join(__dirname, '../views/css', 'style.css'));
})
router.get('/auth/js/main.js', (req, res)=> {
    res.sendFile(path.join(__dirname, '../views/js', 'main.js'));
})
 
module.exports = router;