
const rateLimit = require('express-rate-limit');

const express = require('express');
const router = express.Router();
const servicemanagmentController = require('../controllers/servicemanagmentController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
const upload = require("../middleware/upload")


router.post('/', servicemanagmentController.create);




module.exports=router;