var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;

var servicemanagmentSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            index: true
        },
        sortorder: {
            type: Number,
            default: null
        },
        slug: {
            type: String,
            unique: true
        },
        delstatus: {
            type: Boolean,
            default: false
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
        createdby: {
            type: String
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

module.exports = mongoose.model('Servicemanagment', servicemanagmentSchema);  