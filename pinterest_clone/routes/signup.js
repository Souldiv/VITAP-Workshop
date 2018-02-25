const express = require('express');
let router = express.Router();
user = require('../models/users');
const bcrypt = require('bcrypt');

router.get('/', function(req,res,next){
  if(req.session.user){
    res.redirect('/');
  }
  res.render('signup');
});

router.post('/', function(req,res,next) {

  let userDetails = {
    username: req.body.email,
    fname: req.body.fname,
    lname: req.body.lname,
  };

  let flag = false;
  user.getDetails(userDetails.username, function (err, details) {
    if (err) {
      return next(err);
    }

    if (details) {
      req.session.FlashMessage = "Username already exists!";
      res.redirect('/signup');
    }
    else {
      userDetails.password = bcrypt.hashSync(req.body.pass, 10);
      user.addDetails(userDetails, function (err, result) {
        if (err) return next(err);
        console.log(result);
        req.session.user = {username: result.username, id: result._id};
        res.redirect('/');
      });
    }
  });
});
module.exports = router;
