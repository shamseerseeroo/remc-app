require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const Contactus = require('../models/contactusModel');
const commonMethods = require('../utilities/common');
const contactusService = new modelService(Contactus);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

exports.create = async (req, res, next) => {
  res.data = await contactusService.create({
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    address: req.body.address,
  });
  if (res.data) {
    return next();
  }
  debug('Error occured while saving  data');
  throw new Error();
}
exports.updatecontactus = async (req, res, next) => {
  Contactus.findById(req.params.id, (err, updateItem) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      updateItem.email = req.body.email;
      updateItem.phonenumber = req.body.phonenumber;
      updateItem.updateddate = new Date();
      updateItem.address = req.body.address

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
exports.deletecontactus = async (req, res, next) => {
  console.log(req.params.id)
  const data = await Contactus.findById(req.params.id, function (err, ditItem) {
    if (!ditItem) {
      res.json({
        status: "error",
        message: "no record find with the given id"
      });
    }

    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    ditItem.delstatus = true;
    ditItem.save(function (err) {

      if (err) {
        res.json({
          status: "error",
          message: err
        });
      } else {
        res.json({
          status: "success",
          message: 'Deleted Successfully',
          data: ditItem
        });
      }

    });
  })
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
exports.getcontactusbyid = async (req, res, next) => {
  const contactusdata = await Contactus.findOne({ _id: req.params.id }, (err, result) => {

    console.log(result)
    if (err) {
      consosle.log(err)
      res.json({
        status: "error",
        message: err,
      });
    } else {
      res.json({
        status: "success",
        message: 'pages details loading..',
        data: result
      });
    }
  })
}
exports.getcontactus = async (req, res, next) => {
  const data = await Contactus.find({ delstatus: false }, (err, result) => {
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
exports.getcontactusbyid = async (req, res, next) => {
  const contactusdata = await Contactus.findOne({ _id: req.params.id }, (err, result) => {

    console.log(result.Image)
    console.log(result.Image)
    console.log(result)
    if (err) {
      consosle.log(err)
      res.json({
        status: "error",
        message: err,
      });
    } else {
      res.json({
        status: "success",
        message: 'pages details loading..',
        data: result
      });
    }
  })
}         