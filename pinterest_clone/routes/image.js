var express = require('express');
var router = express.Router();
const user = require('../models/users');
const imageModel = require('../models/images');
/* GETS page to upload images. */
router.get('/', function(req, res, next) {
    if(req.session.user) {
        res.render('image', {user: req.session.user});
    }
    else{
        req.session.FlashMessage = "Please Login to continue.";
        res.redirect('/');
    }
});

router.post('/', function(req, res, next){
    if(req.session.user){
        let link = req.body.link;
        let description = req.body.desc;
        user.getDetails(req.session.user.username, function(err, User){
            if(err) next(err);
            let document = {
                url: link,
                description: description,
                ownerUsername: User.username,
                likedBy: []
            };
            imageModel.addImage(document, function(err, image){
                User.images.push(image.id);
                User.save(function (err, update) {
                    if (err) next(err);
                    req.session.FlashMessage = 'Image Successfully Updated.';
                    res.redirect('/Image');
                });
            });
        });
    }
    else{
        res.redirect('/');
    }
});
module.exports = router;
