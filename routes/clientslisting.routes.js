
const rateLimit = require('express-rate-limit');

const express = require('express');
const router = express.Router();
const clientslistingController = require('../controllers/clientslistingController');
const middlewareResponse = require('../middleware/response');
const multer  = require('multer')
const upload = require("../middleware/clientslistingupload")



//create
router.post('/', upload.single('Image'),middlewareResponse.verifyToken, clientslistingController.create,middlewareResponse.saveResponse);
//update
router.put('/:id',upload.single('Image'),middlewareResponse.verifyToken,clientslistingController.updateclientlisting, middlewareResponse.updateResponse);
router.delete('/:id', middlewareResponse.verifyToken,clientslistingController.deleteclientlisting, middlewareResponse.deleteResponse);
router.get('/',upload.single('Image'),middlewareResponse.verifyToken,clientslistingController.getclientlisting, middlewareResponse.getByIdResponse);




module.exports=router;