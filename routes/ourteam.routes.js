
const express = require('express');
const router = express.Router();
const ourteamController = require('../controllers/ourteamController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
const upload = require("../middleware/ourteamupload")



//create
router.post('/', upload.single('Image'),middlewareReponse.verifyToken, ourteamController.create,middlewareReponse.saveResponse);
//update
router.put('/:id',upload.single('Image'),middlewareReponse.verifyToken,ourteamController.updateourteam, middlewareReponse.updateResponse);
router.delete('/:id', middlewareReponse.verifyToken,ourteamController.deleteourteam, middlewareReponse.deleteResponse);
router.get('/',upload.single('Image'),middlewareReponse.verifyToken,ourteamController.getourteam, middlewareReponse.getByIdResponse);
router.get('/:id',middlewareReponse.verifyToken,ourteamController.getourteambyid);


module.exports=router;