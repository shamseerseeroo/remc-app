require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const Blog = require('../models/blogModel');
const commonMethods = require('../utilities/common');
const blogService = new modelService(Blog);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const sharp= require("sharp")
const config = require('../config/config');
const mongoose = require('mongoose');


exports.create = async (req, res, next) => {
  console.log("hii")
  console.log(req.body)
  console.log(req.file.filename)
  res.data = await blogService.create({
    title: req.body.title,
    content: req.body.content,
    Image: req.file.filename,
    createdby: req.body.userId,
    sortorder: req.body.sortorder,
    client: mongoose.Types.ObjectId(req.body.clientId),
    status: req.body.status,
    tag : req.body.tag ,
    seotitle : req.body.seotitle ,
    metatitle : req.body.metatitle ,
    metadescription  :req.body.metadescription  

  });
  if (res.data) {
    console.log(res.data)
    try {
      sharp(req.file.path).resize(200, 200).toFile('uploads/blog/thumbs/' + 'thumbnails-' + req.file.originalname, (err, resizeImage) => {
          if (err) {
              console.log(err);
          } else {
              console.log(resizeImage);
          }
      })
      console.log("heloo")
      return res.status(201).json({
        status: "success",
        message: "blog retrieved successfully",
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
exports.updateblog = async (req, res, next) => {
  Blog.findById(req.params.id, (err, updateItem) => {
    
    if (err) {
        res.json({
            status: "error",
            message: err,
        });
    } else {   
      if(req.file){
        
        const path = './uploads/blog/'+updateItem.Image

        try {
          fs.unlinkSync(path)
          //file removed
        } catch(err) {
          console.error(err)
        }
      }
        
        updateItem.title = req.body.title;
        updateItem.content = req.body.content;
        updateItem.updateddate = new Date();
        if(req.file){
        updateItem.Image = req.file.filename
        }
        updateItem.sortorder = req.body.sortorder;
        updateItem.createdby = req.body.email
        updateItem.status = req.body.status
        updateItem.client = mongoose.Types.ObjectId(req.body.clientId) 
        updateItem.tag = req.body.tag ,
        updateItem.seotitle = req.body.seotitle ,
        updateItem.metatitle = req.body.metatitle ,
        updateItem.metadescription  =req.body.metadescription  
      
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
exports.deleteblog = async (req, res, next) => {
  console.log(req.params.id)
  const data = await Blog.findById(req.params.id, function (err, ditItem) {
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
  exports.getblog = (req, res) => {
       console.log("hii")
    Blog.find({
              delstatus: false
          }).populate('client').sort({
              sortorder: 1
          })
          .then(function (list) {
            console.log(list)
            list.filter(data=>{
              console.log(data)
              data.Image = config.api.BASE_URL+ "blog/" + data.Image;
              data.client.Image= config.api.BASE_URL+ "clientlisting/" + data.client.Image;
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
    };
  exports.getblogbyid= async (req,res,next) => {
    const blogedata = await Blog.findOne({ _id: req.params.id }, (err, result) => {
     
      console.log(result)
      result.Image = "http://localhost:3000/blog/" + result.Image
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
          message: 'blog details loading..',
          data: result
        });
      }
    })
  }        
  exports.getblogstatus= async (req,res, next)=>{
    Blog.find({
      delstatus: false,
      status: true
  }).populate('client')
  .then(function (list) {
       
         list.filter(data=>{
      data.Image = config.api.BASE_URL+ "blog/" + data.Image; 
      data.client.Image= config.api.BASE_URL+ "clientlisting/" + data.client.Image;
      console.log(data)
      })
      res.json({
          status: "success",
          message: "testimonial retrieved successfully",
          data: list
      });
  })
  //   Blog.find({
  //     status: true
  // }).populate("client").sort({
  //     sortorder: 1
  // })
  // .then(function (list) {
  //   list.filter(data=>{
  //     data.Image = config.api.BASE_URL+ "blog/" + data.Image;
  //     })
  //     res.json({
  //         status: "success",
  //         message: "testimonial retrieved successfully",
  //         data: list
  //     });
  // })
  .catch((err) => {
      res.json({
          status: "error",
          message: err,
      });
  })
  }     
