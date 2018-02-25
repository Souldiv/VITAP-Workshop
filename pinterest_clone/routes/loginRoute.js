var express = require('express');
var router = express.Router();
var passport = require('passport');

/* Handles login routes */

router.get('/', function(req, res, next){
    res.redirect('/');
});
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'),function(req,res, next){
    res.redirect('/Image');
});
module.exports = router;
