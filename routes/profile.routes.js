


const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const middlewareReponse = require('../middleware/response');


router.post('/', profileController.postdata,middlewareReponse.verifyToken);


module.exports=router;