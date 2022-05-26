
const express = require('express');
const router = express.Router();
const careersController = require('../controllers/careersController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
const upload = require("../middleware/careersupload")



//create
router.post('/', upload.single('Image'),middlewareReponse.verifyToken, careersController.create,middlewareReponse.saveResponse);
//update
router.put('/:id',upload.single('Image'),middlewareReponse.verifyToken,careersController.updatepage, middlewareReponse.updateResponse);
router.delete('/:id', middlewareReponse.verifyToken,careersController.deletepage, middlewareReponse.deleteResponse);
router.get('/:slug',upload.single('Image'),middlewareReponse.verifyToken,careersController.getpage, middlewareReponse.getByIdResponse);

module.exports=router;