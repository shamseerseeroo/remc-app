var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;

var bannerSchema = new Schema(
    {
        title: {
            type: String
        },
        description: {
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
        status: {
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
        buttonurl:{
            type: String
        },
        buttontext:{
            type: String
        }


    }
);

module.exports = mongoose.model('banner', bannerSchema);  