
const rateLimit = require('express-rate-limit');

const express = require('express');
const router = express.Router();
const servicemanagmentController = require('../controllers/servicemanagmentController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
const upload = require("../middleware/serviceupload")



//create
router.post('/', upload.single('Image'),middlewareReponse.verifyToken, servicemanagmentController.create,middlewareReponse.saveResponse);
//update
router.put('/:id',upload.single('Image'),middlewareReponse.verifyToken,servicemanagmentController.updatepage, middlewareReponse.updateResponse);
router.delete('/:id', middlewareReponse.verifyToken,servicemanagmentController.deletepage, middlewareReponse.deleteResponse);
router.get('/:slug',upload.single('Image'),middlewareReponse.verifyToken,servicemanagmentController.getpage, middlewareReponse.getByIdResponse);
router.get('/id/:id',middlewareReponse.verifyToken,servicemanagmentController.getpagebyid);




module.exports=router;