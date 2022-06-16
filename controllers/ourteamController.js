require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const Ourteam = require('../models/ourteamModel');
const commonMethods = require('../utilities/common');
const ourteamService = new modelService(Ourteam);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const sharp= require("sharp")

exports.create = async (req, res, next) => {
  console.log("hu");
  res.data = await ourteamService.create({
    Name: req.body.Name,
    designation: req.body.designation,
    Image: req.file.filename,
    sortorder: req.body.sortorder,
    status:req.body.status
  });
  if (res.data) {
    try {
      sharp(req.file.path).resize(200, 200).toFile('uploads/ourteam/thumbs/' + 'thumbnails-' + req.file.originalname, (err, resizeImage) => {
          if (err) {
              console.log(err);
          } else {
              console.log(resizeImage);
          }
      })
      return res.status(201).json({
        status: "success",
        message: "ourteam retrieved successfully",
        data: res.data
      });
  } catch (error) {
      console.error(error);
  }
    return next();
  }
  debug('Error occured while saving  data');
  throw new Error();
}
exports.updateourteam = async (req, res, next) => {
    Ourteam.findById(req.params.id, (err, updateItem) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
        if(req.file.filename){
            const path = './uploads/ourteam/'+updateItem.Image
    
            try {
              fs.unlinkSync(path)
              //file removed
            } catch(err) {
              console.error(err)
            }
          }
      updateItem.Name = req.body.Name;
      updateItem.designation = req.body.designation;
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
exports.deleteourteam = async (req, res, next) => {
  console.log(req.params.id)
  const data = await Ourteam.findById(req.params.id, function (err, ditItem) {
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
exports.getourteambyid = async (req, res, next) => {
  const ourteamsdata = await Ourteam.findOne({ _id: req.params.id }, (err, result) => {
    result.Image = "http://localhost:3000/ourteam/"+result.Image 
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
        message: 'our team details loading..',
        data: result
      });
    }
  })
}
exports.getourteam = (req, res) => {
  Ourteam.find({
            delstatus: false
        }).sort({
            sortorder: 1
        })
        .then(function (list) {
            res.json({
                status: "success",
                message: "testimonial retrieved successfully",
                data: list
            });
        })
        .catch((err) => {
            res.json({
                status: "error",
                message: err,
            });
        })
  };
exports.getourteambyid = async (req, res, next) => {
  const ourteamdata = await Ourteam.findOne({ _id: req.params.id }, (err, result) => {

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
        message: 'our team details loading..',
        data: result
      });
    }
  })
}         