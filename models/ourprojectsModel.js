var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;

var ourprojectsSchema = new Schema(
    {

        title: {
            type: String
        },
        description: {
            type: String
        },
        content: {
            type: String
        },
        Image: {
            type: String,
            required: false,
            default: null
        },
        delstatus: {
            type: Boolean,
            default: false
        },
        sortorder: {
            type: Number,
            default: "",
        },
        status: {
            type: Boolean,
            default: false
        }


    }

);

module.exports = mongoose.model('ourprojects', ourprojectsSchema);