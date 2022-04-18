const express = require('express');
const rateLimit = require('express-rate-limit');


const router = express.Router();
const signup = require('../controllers/signupController');
const middlewareReponse = require('../middleware/response');

router.post("/",signup.postdata)



module.exports=router;