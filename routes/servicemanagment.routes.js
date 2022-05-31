
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
router.put('/:id',upload.single('Image'),middlewareReponse.verifyToken,servicemanagmentController.updateservice, middlewareReponse.updateResponse);
router.delete('/:id', middlewareReponse.verifyToken,servicemanagmentController.deleteservice, middlewareReponse.deleteResponse);
router.get('/',upload.single('Image'),middlewareReponse.verifyToken,servicemanagmentController.getservice, middlewareReponse.getByIdResponse);
router.get('/id/:id',middlewareReponse.verifyToken,servicemanagmentController.getservicebyid);
router.get('/:slug',middlewareReponse.verifyToken,servicemanagmentController.getbyslug, middlewareReponse.getByIdResponse);



module.exports=router;