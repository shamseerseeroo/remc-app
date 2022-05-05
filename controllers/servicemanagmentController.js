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
exports.updatepage = async (req, res, next) => {
  const updateData = {
    ...req.body,
    Image: req.file.filename
  }
  console.log(updateData)
  res.data = await Service.updateOne(updateData, req.params.id);
  if (res.data) {
    return next();
  } else {
    debug('Error occured while updating service');
    throw new Error();
  }
}
exports.deletepage = async (req, res, next) => {
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




  // });

//}
