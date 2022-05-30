
const rateLimit = require('express-rate-limit');

const express = require('express');
const router = express.Router();
const clientlistingController = require('../controllers/clientlistingController');
const middlewareResponse = require('../middleware/response');
const multer  = require('multer')
const upload = require("../middleware/clientlistingupload")



//create
router.post('/', upload.single('Image'),middlewareResponse.verifyToken, clientlistingController.create,middlewareResponse.saveResponse);
//update
router.put('/:id',upload.single('Image'),middlewareResponse.verifyToken,clientlistingController.updatepage, middlewareResponse.updateResponse);
router.delete('/:id', middlewareResponse.verifyToken,clientlistingController.deletepage, middlewareResponse.deleteResponse);
router.get('/:slug',upload.single('Image'),middlewareResponse.verifyToken,clientlistingController.getpage, middlewareResponse.getByIdResponse);




module.exports=router;