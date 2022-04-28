
const rateLimit = require('express-rate-limit');

const express = require('express');
const router = express.Router();
const signinController = require('../controllers/servicemanagmentController');
const middlewareReponse = require('../middleware/response');


router.post('/', servicemanagmentController.create);




module.exports=router;