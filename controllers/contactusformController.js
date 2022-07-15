require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const Contactusform = require('../models/contactusModel');
const commonMethods = require('../utilities/common');
const contactusformService = new modelService(Contactusform);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

exports.create = async (req, res, next) => {
 
  res.data = await contactusformService.create({
    Name: req.body.Name,
    Email: req.body.Email,
    phonenumber: req.body.phonenumber,
    subject: req.body.subject,
    messege: req.body.messege
  });
  if (res.data) {
    console.log(res.data)
    return next();
  }
  debug('Error occured while saving  data');
  throw new Error();
}
// exports.create = async (req, res) => {

//   var Contactus = new Contactus();
//   Contactus.email = req.body.email;
//   Contactus.phonenumber = req.body.phonenumber;
//   Contactus.address = req.body.address;

//   Contactus.save((err) => {
//       if (err) {
//           res.json({
//               status: "error",
//               message: err,
//           });
//       } else {
//           res.json({
//               status: "success",
//               message: 'Successfully Created',
//               data: Contactus
//           });
//       }
//   });
// };
exports.updatecontactusform = async (req, res, next) => {
    Contactusform.findById(req.params.id, (err, updateItem) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
        updateItem.Name= req.body.Name,
        updateItem.Email= req.body.Email,
        updateItem.phonenumber= req.body.phonenumber,
        updateItem.subject= req.body.subject,
        updateItem.messege= req.body.messege

      updateItem.save((err) => {

        if (err) {
          res.json({
            status: "error",
            message: err,
          });
        } else {
          res.json({
            status: "success",
            message: 'Updated Successfully',
            data: updateItem
          });
        }

      });
    }

  }
  )
}
// exports.getpage = async (req, res, next) => {
//   const filterResponse = await commonMethods.filterResponse(req.query);

//   const serviceRes = await Service.getAll(filterResponse);
//   const totalCount = await Service.totalCount();
//   if (serviceRes) {

//       const response = {
//         count: totalCount,
//         data: pageRes,
//       };
//       res.data = response;

//       return next();
//     } else {
//       debug('Error occured while fetching all pages');
//       throw new Error();
//     }
//   }
exports.getcontactusform = async (req, res, next) => {
  const data = await Contactusform.find({ delstatus: false }, (err, result) => {
    console.log(result);
    if (result) {
      const response = {
        data: result,
      };
      res.data = response;

      return next();
    } else {
      debug('Error occured while fetching all pages');
      throw new Error();
    }
  })
}
exports.getcontactusformbyid = async (req, res, next) => {
  console.log(req)
  const contactusdata = await Contactusform.findOne({_id : req.params.id }, (err, result) => {
    console.log("hiiii")
    
       
    console.log(result)
    if (err) {
      console.log("error")
      res.json({        status: "error",
        message: err,
      });
    } else {
      console.log("success");
      res.json({
        status: "success",
        message: 'contact details loading..',
        data: result
      });
    }
  })
}  