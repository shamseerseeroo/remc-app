var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;
var slugs = require('mongoose-url-slugs');

var userSchema = new Schema(
  {
    username: {
      type: 'string',
    },
    email: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true
    },
    image: {
      type : String
    }
    
      
  
  
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(slugs('name'));

module.exports = mongoose.model('User', userSchema);