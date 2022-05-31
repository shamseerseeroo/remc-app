require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const servicemanagment = require('../models/servicemanagmentModel');
const commonMethods = require('../utilities/common');
const Service = new modelService(servicemanagment);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');


exports.create = async (req, res, next) => {
  res.data = await Service.create({
    title: req.body.title,
    description: req.body.description,
    Image: req.file.filename,
    createdby: req.body.email,
    sortorder: req.body.sortorder,
    status: req.body.status
  });
  if (res.data) {
    return next();
  }
  debug('Error occured while saving  data');
  throw new Error();
}
exports.updateservice = async (req, res, next) => {
  servicemanagment.findById(req.params.id, (err, updateItem) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      updateItem.title = req.body.title;
      updateItem.description = req.body.description;
      updateItem.updateddate = new Date();
      updateItem.Image = req.file.filename
      updateItem.sortorder = req.body.sortorder

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
exports.deleteservice = async (req, res, next) => {
  console.log(req.params.id)
  const data = await servicemanagment.findById(req.params.id, function (err, ditItem) {
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
exports.getservicebyid = async (req, res, next) => {
  const servicedata = await servicemanagment.findOne({ _id: req.params.id }, (err, result) => {
     
    console.log(result.Image)
    result.Image = "http://localhost:3000/service/" + result.Image
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
        message: 'service details loading..',
        data: result
      });
    }
  })
}
exports.getservice = async (req, res, next) => {
  const data = await servicemanagment.find({ delstatus: false }, (err, result) => {
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
exports.getbyslug = async (req, res, next) => {
  res.data = await Service.getByslug(req.params.slug);
  if (res.data) {
    return next();
  } else {
    debug('Error occured while fetching perticular todo');
  }
}






  // });

//}
