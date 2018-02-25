const express = require('express');
let router = express.Router();
const imageModel = require('../models/images');
let flag;
/* GET homepage which shows all images uploaded by users. */
router.get('/', function(req, res, next) {
    if(req.session.user) {
        flag =1;
    }
    else {
        flag = 0;
    }
    imageModel.getEverything(function(err, data){
        if(err) return next(err);
        res.render("index", {data: data});
    });
});

module.exports = router;
