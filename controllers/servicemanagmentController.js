require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const servicemanagment = require('../models/servicemanagmentModel');
const commonMethods = require('../utilities/common');
const Service = new modelService(servicemanagment);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const sharp= require("sharp")


exports.create = async (req, res, next) => {
  res.data = await Service.create({
    title: req.body.title,
    description: req.body.description,
    Image: req.file.filename,
    createdby: req.body.userId,
    sortorder: req.body.sortorder,
    status: req.body.status
  });
  if (res.data) {
    try {
      sharp(req.file.path).resize(200, 200).toFile('uploads/service/thumbs/' + 'thumbnails-' + req.file.originalname, (err, resizeImage) => {
          if (err) {
              console.log(err);
          } else {
              console.log(resizeImage);
          }
      })
      return res.status(201).json({
        status: "success",
        message: "service retrieved successfully",
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
exports.updateservice = async (req, res, next) => {
  servicemanagment.findById(req.params.id, (err, updateItem) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      if(req.file.filename){
        const path = './uploads/service/'+updateItem.Image

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
  console.log("hii")
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
exports.getservice = (req, res) => {

  servicemanagment.find({
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
exports.getbyslug = async (req, res, next) => {
  res.data = await Service.getByslug(req.params.slug);
  if (res.data) {
    return next();
  } else {
    debug('Error occured while fetching perticular service');
  }
}






  // });

//}
