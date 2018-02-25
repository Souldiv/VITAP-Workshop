var mongoose = require('mongoose');
var schema = mongoose.Schema;

var imageSchema = new schema({
    ownerUsername: {
        type: String
    },
    description:{
        type: String
    },
    url:{
      type: String
    },
    likedBy: []
});

var imageModel = module.exports = mongoose.model('imageModel', imageSchema);

module.exports.getAllImages = function(username, callback){
    imageModel.find({ownerUsername: username}, callback);
};

module.exports.addImage = function(details, callback){
    imageModel.create(details, callback);
};

module.exports.getByName = function(username, callback){
    imageModel.findOne({username: username}, callback);
};

module.exports.getEverything = function(callback){
    imageModel.find({},callback);
};
