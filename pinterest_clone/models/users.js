const mongoose = require('mongoose');
let schema = mongoose.Schema;

let userSchema = new schema({
    username: {
        type: String,
        unique: true
    },
    fname:{
      type: String
    },
    lname:{
      type: String
    },
    password:{
      type: String
    },
    images: []
});

let user = module.exports = mongoose.model('user', userSchema);

module.exports.getDetails = function(username, callback){
    user.findOne({username: username}, callback);
};

module.exports.addDetails = function(details, callback){
    user.create(details, callback);
};

module.exports.getById = function(id, callback){
    user.findById(id, callback);
};
