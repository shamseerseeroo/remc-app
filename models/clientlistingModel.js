var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var { Schema } = mongoose;
var slugs = require('mongoose-url-slugs');

var clientlistingSchema = new Schema(
  {
    name: {
      type: 'string',
      required: true,
    },
    Image: {
        type: String,
        required: false,
        default: null
    },
    sortOrder: {
        type: Number,
        default: "",
      },
    description: {
      type: 'string',
    },
    active: {
      type: 'boolean',
      default: true,
    },
    delstatus: {
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

clientlistingSchema.plugin(slugs('name'));

module.exports = mongoose.model('clientlisting', clientlistingSchema);