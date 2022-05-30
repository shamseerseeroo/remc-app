require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const pages = require('../models/pagesModel');
const commonMethods = require('../utilities/common');
const pagesService = new modelService(pages);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const upload = require('../middleware/pageupload');
const { response } = require('../app');


exports.create = async (req, res, next) => {
  res.data = await pagesService.create({
    title: req.body.title,
    description: req.body.description,
    Image: req.file.filename,
    createdby: req.body.email
  });
  console.log(req.body);
  console.log(res.data)
  if (res.data) {
    return next();
  }
  debug('Error occured while saving  data');
  throw new Error();
}
exports.updatepage = async (req, res, next) => {
  pages.findById(req.params.id, (err, updateItem) => {
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
        updateItem.description = req.body.description;

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
//   console.log(updateData)
//   const data = await pages.findOne({_id:req.params.id,delstatus:false},function(err,result){
//     if (err) {
//       res.json({status: "error", message: err, })
//   } else {
//      console.log(result);
//   }});
//   if (res.data) {

//     return next();
//   } else {
//     debug('Error occured while updating page');
//     throw new Error();
//   }
// }




  // // save the contact and check for errors

exports.deletepage = async (req, res, next) => {
  console.log(req.params.id)
  const data = await pages.findById(req.params.id, function (err, ditItem) {
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
exports.getpage = async (req, res, next) => {
  const totalCount = await pagesService.totalCount();
  const data = await pages.find({ delstatus: false }, (err, result) => {
    console.log(result);
    if (result) {
      const response = {
        count: totalCount,
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

exports.getpagebyid = async (req, res, next) => {
  const pagesdata = await pages.findOne({ _id: req.params.id }, (err, result) => {

    console.log(result.Image)
    result.Image = "http://localhost:3000/pages/" + result.Image
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









