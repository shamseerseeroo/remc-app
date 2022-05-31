var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;
var slugs = require('mongoose-url-slugs');

var contactusSchema = new Schema(
  {
    
    email: {
      type: 'string',
      required: true,
    },
    phonenumber: {
      type: 'string',
      required: true
    },
    address: {
      type : String
    }
    
      
  
  
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('contactus', contactusSchema);