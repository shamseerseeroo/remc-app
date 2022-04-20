

const debug = require('debug')('todo-api:controllers/todo');
require('express-async-errors');
const modelService = require('../services/modelService');
const ImageModel = require('../models/imageModel');
const User = require('../models/userModel');
const commonMethods = require('../utilities/common');
//const profileService = new modelService(Profile);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
//const dotenv = require('dotenv');
const multer  = require('multer')
var jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/response');
require("dotenv").config();



//storage

const profile = {
    postdata: async (req, res, next) => {
        try {
            if(req.file){
                
                User.image = req.file.path
            }
            // let image = req.files.image;
            // image.mv(`./public/uploads/${Date.now()}.jpg`, (err, done) => {
            //     if(err) {
            //         console.log(err);
            //     } else {
            //         console.log(done);
            //         console.log("image uploaded");
            //     }
            // });
            // const oldUser = await Profile.findOne({ email })
            // if (oldUser) {
            //     return res.status(409).send("this user is already exist")
            // }

              
              




        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = profile;