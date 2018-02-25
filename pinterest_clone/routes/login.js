const express = require('express');
const router = express.Router();
user = require('../models/users');
const bcrypt = require('bcrypt');
// const passport = require('passport');

/* Handles login routes */

router.get('/logout', function(req,res,next){
  console.log(req.session.user);
  if(req.session.user){
    console.log(req.session.id + ' ' +req.session.UserID );
    req.session.destroy();
    res.redirect('/');
  }
  else{
    console.log("not logged in");
    res.redirect('/');
  }
});

router.get('/', function(req, res, next){
  res.redirect('/');
});

router.get('/login', function(req,res,next){
  if(!req.session.UserID) res.render("login");
  else res.redirect('/');
});

router.post('/login', function(req, res, next){
  let username = req.body.user;
  let password = req.body.pass;
  console.log(req.body);
  user.getDetails(username, function(err, details){
    console.log(1);
    if(err) next(err);
    if(details.length !== 0) {
      bcrypt.compare(password ,details.password)
        .then((data) => {
          if(data){
            req.session.user = {username: details.username, id: details._id};
            res.redirect('/');
          }
          else {
            req.session.FlashMessage = "Please check your username/password and try again.";
            res.redirect('/auth/login');
          }
        })
        .catch((err) => {
          next(err);
        });
      // bcrypt.hash(password, creds[0].salt, function (err, hashed) {
      //   console.log(hashed);
      //   console.log(creds[0].password);
      //   if (hashed === creds[0].password) {
      //     req.session.UserID = creds[0]._id;
      //     console.log(req.session.UserID);
      //     res.locals.UserID = req.session.UserID;
      //     res.redirect('/search');
      //     // console.log(req.locals.UserID);
      //   }
      //   else {
      //     req.session.FlashMessage = "Please check your username/password and try again.";
      //     res.redirect('/login');
      //   }
      // });
    }
    else{
      req.session.FlashMessage = "Invalid Credentials!";
      console.log(req.session.FlashMessage);
      res.redirect('/login');
    }
  });
});

module.exports = router;
