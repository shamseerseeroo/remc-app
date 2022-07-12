require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const Careers = require('../models/careersModel');
const commonMethods = require('../utilities/common');
const careersService = new modelService(Careers);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const sharp= require("sharp")



exports.create = async (req, res, next) => {
  console.log(req.body)
  console.log(req.file.filename)
  res.data = await careersService.create({
    title: req.body.title,
    description: req.body.description,
    Image: req.file.filename,
    createdby: req.body.userId,
    sortorder: req.body.sortorder,
    status: req.body.status
  });
  if (res.data) {
    console.log(res.data)
    try {
      sharp(req.file.path).resize(200, 200).toFile('uploads/careers/thumbs/' + 'thumbnails-' + req.file.originalname, (err, resizeImage) => {
          if (err) {
              console.log(err);
          } else {
              console.log(resizeImage);
          }
      })
      console.log("heloo")
      return res.status(201).json({
        status: "success",
        message: "careers retrieved successfully",
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
exports.updatecareer = async (req, res, next) => {
  Careers.findById(req.params.id, (err, updateItem) => {
    
    if (err) {
        res.json({
            status: "error",
            message: err,
        });
    } else {   
      if(req.file){
        
        const path = './uploads/careers/'+updateItem.Image

        try {
          fs.unlinkSync(path)
          //file removed
        } catch(err) {
          console.error(err)
        }
      }
        
        updateItem.title = req.body.title;
        updateItem.description = req.body.description;
        updateItem.updateddate = new Date();
        if(req.file){
        updateItem.Image = req.file.filename
        }
        updateItem.sortorder = req.body.sortorder;
        updateItem.status = req.body.status
        updateItem.createdby = req.body.email
      
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

});
}
exports.deletecareer = async (req, res, next) => {
  console.log(req.params.id)
  const data = await Careers.findById(req.params.id, function (err, ditItem) {
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
  exports.getcareer = (req, res) => {

    Careers.find({
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
  exports.getcareersbyid= async (req,res,next) => {
    console.log("hiicareerrs")
    const careersedata = await Careers.findOne({ _id: req.params.id }, (err, result) => {
     
      console.log(result)
      result.Image = "http://localhost:3000/careers/" + result.Image
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
          message: 'career details loading..',
          data: result
        });
      }
    })
  }        
  exports.getcareerstatus= async (req,res, next)=>{
    Careers.find({
      status: true
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
  }     