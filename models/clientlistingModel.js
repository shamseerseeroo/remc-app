var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;

var clientlistingSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            index: true
        },
        delstatus: {
            type: Boolean,
            default: false
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

module.exports = mongoose.model('clientlisting', clientlistingSchema);  