var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;
var slugs = require('mongoose-url-slugs');

var userSchema = new Schema(
  {
    name: {
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
      type:String
    }
    
      
  
  
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(slugs('email'));

module.exports = mongoose.model('User', userSchema);