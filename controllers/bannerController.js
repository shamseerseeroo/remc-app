require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const Banner = require('../models/bannerModel');
const commonMethods = require('../utilities/common');
const bannerService = new modelService(Banner);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const sharp= require("sharp")
const config = require('../config/config');



exports.create = async (req, res, next) => {
  console.log("hii")
  console.log(req.body)
  console.log(req.file.filename)
  res.data = await bannerService.create({
    title: req.body.title,
    description: req.body.description,
    Image: req.file.filename,
    createdby: req.body.userId,
    sortorder: req.body.sortorder,
    status: req.body.status,
    buttonurl: req.body.buttonurl,
    buttontext: req.body.buttontext

  });
  if (res.data) {
    console.log(res.data)
    try {
      sharp(req.file.path).resize(200, 200).toFile('uploads/banner/thumbs/' + 'thumbnails-' + req.file.originalname, (err, resizeImage) => {
          if (err) {
              console.log(err);
          } else {
              console.log(resizeImage);
          }
      })
      console.log("heloo")
      return res.status(201).json({
        status: "success",
        message: "banner retrieved successfully",
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
exports.updatebanner = async (req, res, next) => {
  Banner.findById(req.params.id, (err, updateItem) => {
    
    if (err) {
        res.json({
            status: "error",
            message: err,
        });
    } else {   
      if(req.file){
        
        const path = './uploads/banner/'+updateItem.Image

        try {
          fs.unlinkSync(path)
          //file removed
        } catch(err) {
          console.error(err)
        }
      }
        
        updateItem.title = req.body.title;
        updateItem.content = req.body.description;
        updateItem.updateddate = new Date();
        if(req.file){
        updateItem.Image = req.file.filename
        }
        updateItem.sortorder = req.body.sortorder;
        updateItem.createdby = req.body.email
        updateItem.sttaus = req.body.status
        updateItem.buttonurl = req.body.buttonurl ,
        updateItem.buttontext = req.body.buttontext 
      
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
exports.deletebanner = async (req, res, next) => {
  console.log(req.params.id)
  const data = await Banner.findById(req.params.id, function (err, ditItem) {
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
  exports.getbanner = (req, res) => {

    Banner.find({
              delstatus: false
          }).sort({
              sortorder: 1
          })
          .then(function (list) {
              
               for(i=0;i<list.length;i++){
                list[i].Image="http://localhost:3000/uploads/banner/" + list[i].Image
               }
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
  exports.getbannerbyid= async (req,res,next) => {
    const bannerdata = await Banner.findOne({ _id: req.params.id }, (err, result) => {
     
      console.log(result)
      result.Image = "http://localhost:3000/uploads/banner/" + result.Image
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
          message: 'banner details loading..',
          data: result
        });
      }
    })
  }   
  exports.getbannerstatus= async (req,res, next)=>{
    Banner.find({
      status: true
  }).sort({
      sortorder: 1
  })
  .then(function (list) {
    list.filter(data=>{
      data.Image = config.api.BASE_URL+ "uploads/banner/" + data.Image;
      })
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