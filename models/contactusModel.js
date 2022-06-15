var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;

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
      type: String
    },
    delstatus: {
      type: Boolean,
      default: false
    },
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true
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





  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('contactus', contactusSchema);