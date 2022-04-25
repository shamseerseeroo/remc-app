

const debug = require('debug')('todo-api:controllers/todo');
require('express-async-errors');
const modelService = require('../services/modelService');
const User = require('../models/userModel');
const commonMethods = require('../utilities/common');
//const profileService = new modelService(Profile);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
//const dotenv = require('dotenv');
const multer  = require('multer')
var jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/response');
const { nextTick } = require('process');
const { response } = require('express');
require("dotenv").config();



// //storage

// const profile = {
//     postdata: async (req, res, next) => {
//         try {
//             if(req.file){
                
//                 User.image = req.file.path
//             }
//             // let image = req.files.image;
//             // image.mv(`./public/uploads/${Date.now()}.jpg`, (err, done) => {
//             //     if(err) {
//             //         console.log(err);
//             //     } else {
//             //         console.log(done);
//             //         console.log("image uploaded");
//             //     }
//             // });
//             // const oldUser = await Profile.findOne({ email })
//             // if (oldUser) {
//             //     return res.status(409).send("this user is already exist")
//             // }

              
              




//         } catch (err) {
//             console.log(err)
//         }
//     }
exports.profile = async (req,res) => {
    console.log(req.body);
      try {
          let updates = {
              ...req.body,
              image: req.file.filename,
          }

          if(req.body.email){
              const oldUser = await User.findOne({ email: req.body.email })
              if (oldUser) {
                  return res.status(409).send("this user is already exist")
              }
          }
          if(req.body.password){
            updates.password = await bcrypt.hash(req.body.password, 10)
          }
           if (req.file) {
               const userdata = await User.findOneAndUpdate({_id:req.body._id},{$set: updates}, { new: true })  
               return res.status(200).send(userdata);
           }else{
              const userdata = await User.findOneAndUpdate({_id:req.body._id},{$set: updates}, { new: true })
              return res.status(200).send(userdata);
           }
      } catch (error) {
           console.log(error)      }
     }
     //  User.findOne({email:req.body.email},function(err,userdata){
     //       if(userdata){
     //            res.send("this email is already exist");
     //       }else{
     //            console.log(err)
     //       }
     //  })
     //  if(req.body.password){
     //      encryptedPassword = await bcrypt.hash(password, 10)
     //  }
     //  if(req.file.filename){
     //  let data ={
     //      usename:req.body.username,
     //      password:encryptedPassword,
     //      email:req.body.password,
     //      image:req.file.filename
     //  }
     // }else{
     //      // data={
     //      //      usename:req.body.username,
     //      //      password:encryptedPassword,
     //      //      email:req.body.password,  
     //      // }
     // }
     //  User.updateOne({id:req.params._id},(data),(err,responsedata)=>{
     //       console.log(responsedata)
     //  })
     // }


//     User.findOne({
//          email: req.body.email
//     },async function(err, userdata){
//          if(err){
//               res.json({
//                    status:"error",
//                    messege: err,
//               });
//          }else{
//               console.log(userdata)
//               if(userdata != null){
//                    User.find({email:req.body.email},(err,emaildata)=>{
//                          const emailexist = emaildata !== userdata.email
//                          if(emaildata){
//                               res.send("email already exist");

//                          }else{
//                               next()
//                          }
//                    })
//               }
//           }
//      }
//     )
// }
              

     //     var update = User.findByIdAndUpdate(req.body.id,{

     //          username:req.body.username,
     //          email:req.body.email,
     //          password:req.body.password,
     //          image:req.file.filename
     //     })
     //     update.exec(function(err,data){
     //          if (err) throw err
     //          res.send("succesfully updated")

              


              
     //     })
    


     //     res.json({
               //          status: "error",
               //          messege: {
               //               errmsg: "Email id Already Exist",
               //               errorcode: 100
               //          }
               //     })

                   
               //     if(req.body.password){
               //         encryptedPassword = await bcrypt.hash(password, 10)
               //         const userdata={
               //           username:req.body.username,
               //           email:req.body.email,
               //           password:req.encryptedPassword,
               //           image:req.file.filename
               //         }
               //     }