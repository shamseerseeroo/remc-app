
const express = require('express');
const router = express.Router();
const clientlistingController = require('../controllers/clientlistingController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
const upload = require("../middleware/clientlistingupload")



//create
router.post('/', upload.single('Image'),middlewareReponse.verifyToken, clientlistingController.create,middlewareReponse.saveResponse);
//update
router.put('/:id',upload.single('Image'),middlewareReponse.verifyToken,clientlistingController.updateclientlisting, middlewareReponse.updateResponse);
router.delete('/:id', middlewareReponse.verifyToken,clientlistingController.deleteclientlisting, middlewareReponse.deleteResponse);
router.get('/',upload.single('Image'),middlewareReponse.verifyToken,clientlistingController.getclientlisting, middlewareReponse.getByIdResponse);
router.get('/id/:id',middlewareReponse.verifyToken,clientlistingController.getclientlistingbyid);


module.exports=router;