require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const pages = require('../models/pagesModel');
const commonMethods = require('../utilities/common');
const pagesService = new modelService(pages);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');


exports.create=async (req,res,next)=>{
     res.data = await pagesService.create({
         title:req.body.title,
         description: req.body.description,
         Image:req.file.filename,
         createdby : req.body.email
     });
     if (res.data) {
       return next();
     }
     debug('Error occured while saving  data');
     throw new Error();
   }
exports.updatepage=async (req,res,next)=>{
    const updateData = {
        ...req.body,
        Image: req.file.filename
    }
    console.log(updateData)
    res.data = await pagesService.updateOne(updateData, req.params.id);
    if (res.data) {
      return next();
    } else {
      debug('Error occured while updating page');
      throw new Error();
    }
  }
exports.deletepage=async (req,res,next)=>{
  console.log(req.params.id)
  const data = await pages.findById(req.params.id,function(err,ditItem){
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
      
         
      
      
    
  });
  
}
exports.getpage=async(req,res,next)=>{
  const filterResponse = await commonMethods.filterResponse(req.query);

    const pageRes = await pagesService.getAll(filterResponse);
    const totalCount = await pagesService.totalCount();
    if (pageRes) {
      
      const response = {
        count: totalCount,
        data: pageRes,
      };
      res.data = response;
  
      return next();
    } else {
      debug('Error occured while fetching all pages');
      throw new Error();
    }
}



 






