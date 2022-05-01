require('express-async-errors');
const modelService = require('../services/modelService');
const dotenv = require('dotenv');
const service = require('../models/servicemanagmentModel');
const commonMethods = require('../utilities/common');
const pagesService = new modelService(service);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');


exports.create=async (req,res,next)=>{
     res.data = await pagesService.create({
         title:req.body.title,
         description: req.body.description,
         Image:req.file.filename,
         createdby : req.body.email,
         sortorder:req.body.sortorder,
         status:req.body.status
     });
     if (res.data) {
       return next();
     }
     debug('Error occured while saving  data');
     throw new Error();
   }
   