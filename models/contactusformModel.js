var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;

var contactusformSchema = new Schema(
  {
    Name: {
        type: String
      },
    Email: {
      type: String
    },
    phonenumber: {
      type: Number
    },
    subject: {
      type: String
    },
    Message:{
        type: String
    },
    createddate: {
      type: Date,
      default: Date.now
    },
    updateddate: {
      type: Date,
      default: null
    }


  }
);

module.exports = mongoose.model('contactusform', contactusformSchema);