
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const Clientslisting = require('../models/clientslistingModel');
const commonMethods = require('../utilities/common');
const clientslistingService = new modelService(Clientslisting);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs');

exports.create = async (req, res, next) => {
  res.data = await clientslistingService.create({
    name: req.body.name,
    description: req.body.description,
    Image: req.file.filename,
    sortorder: req.body.sortorder,
    status: req.body.status
  });
  if (res.data) {
    
    console.log(res.data)
    return next();
  }
  debug('Error occured while saving  data');
  throw new Error();
}
exports.updateclientlisting = async (req, res, next) => {
  Clientslisting.findById(req.params.id, (err, updateItem) => {
    if (err) {
        res.json({
            status: "error",
            message: err,
        });
    } else {
      if(req.file.filename){
        const path = './uploads/clientlisting/'+updateItem.Image

        try {
          fs.unlinkSync(path)
          //file removed
        } catch(err) {
          console.error(err)
        }
      }
        updateItem.name = req.body.name;
        updateItem.description = req.body.description;
        updateItem.updateddate = new Date();
        updateItem.Image = req.file.filename
        updatedItem.sortorder = req.body.sortorder

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
exports.deleteclientlisting = async (req, res, next) => {
  console.log(req.params.id)
  const data = await Clientslisting.findById(req.params.id, function (err, ditItem) {
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
  exports.getclientlistingbyid = async (req, res, next) => {
    const pagesdata = await Clientslisting.findOne({ _id: req.params.id }, (err, result) => {
      
      console.log(result.Image)
      result.Image = "http://localhost:3000/clientlisting/"+result.Image 
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
  exports.getclientlisting = async (req, res, next) => {
    const data = await Clientslisting.find({ delstatus: false }, (err, result) => {
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