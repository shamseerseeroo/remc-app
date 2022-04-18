
const rateLimit = require('express-rate-limit');

const express = require('express');
const router = express.Router();
const signinController = require('../controllers/signinController');
const middlewareReponse = require('../middleware/response');


router.post('/', signinController.postdata);




module.exports=router;