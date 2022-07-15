var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;

var contactusformSchema = new Schema(
  {
    Name: {
        type: 'string'
      },
    Email: {
      type: 'string'
    },
    phonenumber: {
      type: 'string'
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