const { array } = require('mongoose/lib/utils');

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;

var contactusSchema = new Schema(
  {
    title: {
      type: 'string'
    },  
    description: {
      type: 'string'
    },
    quote: {
      type: 'string'
    },
    mapcordinates: {
      type: Array
    },
    email: {
      type: 'string'
    },
    phonenumber: {
      type: 'string'
    },
    address: {
      type: String
    },
    delstatus: {
      type: Boolean,
      default: false
    },
    createddate: {
      type: Date,
      default: Date.now
    },
    updatedby: {
      type: String,
      default: null
    },
    updateddate: {
      type: Date,
      default: null
    }





  }
);

module.exports = mongoose.model('contactus', contactusSchema);