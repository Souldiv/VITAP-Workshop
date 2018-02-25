var express = require('express');
var router = express.Router();
var norm = require('../models/data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  norm.find({}, function(err, data){
    if(err){
      console.log(err);
    }
    // console.log(data);
    res.json(data);
  });
});

router.post('/create', function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  try {
    var data = {
      city: req.body.city,
      loc: req.body.loc,
      pop: req.body.pop,
      state: req.body.state
    };
  }catch(err){
    res.json({
      flag: false,
      err: 'error making data for city'
    })
  }
  norm.createCity(data, function (err, dat) {
    if(err) {
      res.json({
        flag: false,
        data: null,
        err: 'Theres an Error'
      });
      next(err);
    }
    console.log(dat);
    res.json({
      flag: true,
      data: dat
    });
  });
});

router.get('/city', function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  norm.getWithCity(req.query.city, function (err, data) {
    console.log(req.query);
    if(err) {
      res.json({'flag': false, message: 'error get with city'});
      next(err);
    }
    console.log(data);
    res.json(data);
  })
});

router.post('/updateCity', function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  norm.getWithCity(req.body.city, function(err, doc){
    if(err) res.json({flag: false, message: 'there were errors'});
    doc.city = req.body.ucity;
    doc.save();
    res.json({
      flag: true,
      data: doc
    })
  });
});

module.exports = router;
