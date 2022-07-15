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
    messege:{
        type: String
      },
    createddate: {
      type: Date,
      default: Date.now
    },





  }
);

module.exports = mongoose.model('contactusform', contactusformSchema);