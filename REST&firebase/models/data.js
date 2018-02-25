var mongoose = require('mongoose');
var schema = mongoose.Schema;

var normSchema = new schema({
  city: {
    type: String
  },
  loc:{
    type: []
  },
  pop:{
    type: Number
  },
  state: {
    type: String
  }
});

var normModel = module.exports = mongoose.model('image', normSchema, 'zips');

module.exports.getWithCity = function(city, callback){
  normModel.findOne({city: city}, callback);
};

module.exports.createCity = function(city, callback){
  normModel.create(city, callback);
};

