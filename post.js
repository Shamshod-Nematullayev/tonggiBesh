const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:false}))
router.post('/post.js', (req, res)=>{
    res.send(req.body);
});
module.exports = router