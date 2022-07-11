var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;

var blogSchema = new Schema(
    {
        title: {
            type: String
        },
        content: {
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
        sortorder: {
            type: Number,
            default: "",
          },
        Image: {
            type: String,
            required: false,
            default: null
        },
        tag : {
            type: String
        },
        status: {
            type: Boolean,
            default: false
        },
        seotitle : {
            type: String
        },
        metatitle :{
            type: String 
        },
        metadescription  :{
           type: String
        },
        createddate: {
            type: Date,
            default: Date.now
        }

    }
);

module.exports = mongoose.model('blog', blogSchema);  