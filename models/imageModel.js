var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;
var slugs = require('mongoose-url-slugs');

var ImageSchema = new Schema(
  {
    name: {
      type: 'string',
    },
    image:
    {
        data: Buffer,
        contentType: String
    }
  
  },
 
);


module.exports = mongoose.model('imageModel', ImageSchema);