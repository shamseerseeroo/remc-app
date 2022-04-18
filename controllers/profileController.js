

const debug = require('debug')('todo-api:controllers/todo');
require('express-async-errors');
const modelService = require('../services/modelService');
const Profile = require('../models/profileModel');
const commonMethods = require('../utilities/common');
const profileService = new modelService(Profile);
const bodyParser = require('body-parser');
const bcrypt=require('bcryptjs')
//const dotenv = require('dotenv');
var jwt = require('jsonwebtoken');
const verifyToken  = require('../middleware/response');
require("dotenv").config();

const profile={
    postdata: async(req , res , next)=>{
        try{
          const { name, email , img }=req.body
          

          const oldUser = await Profile.findOne({ name })
               if (oldUser) {
                  return res.status(409).send("this user is already exist")
               }
          
               const profile = await profileService.create({
                name,
                email:email.toLowerCase(),
                image:img,

            });  
            res.status(201).json(profile)

        
        }catch(err){
            console.log(err)
        }
   }
}

module.exports = profile;