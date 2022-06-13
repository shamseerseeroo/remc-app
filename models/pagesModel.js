var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;
var slugs = require('mongoose-url-slugs');

var pagesSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        Image: {
            type: String,
            required: false,
            default: null
        },
        sortorder: {
            type: Number,
            default: "",
          },
        status: {
            type: Boolean,
            default: false
        },

        slug: {
            type: String,
            required: true,
            unique: true
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

pagesSchema.plugin(slugs('title'));

module.exports = mongoose.model('Pages', pagesSchema);   