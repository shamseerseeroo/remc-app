var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;
var slugs = require('mongoose-url-slugs');

var profileSchema = new Schema(
  {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    img:
    {
        data: Buffer,
        contentType: String
    }
  
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('Profile', profileSchema);