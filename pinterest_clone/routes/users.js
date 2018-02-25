const express = require('express');
const router = express.Router();
const imageModel = require('../models/images');
/* GET users uploads */
router.get('/', function(req, res, next) {
    if(req.session.user) {
        imageModel.getAllImages(req.session.user.username, function(err, data){
            if (err) return next(err);
            res.render("user", {image: data});
        });
    }
    else{
        req.session.FlashMessage = 'Please Login to continue.';
        res.redirect('/');
    }
});

module.exports = router;
