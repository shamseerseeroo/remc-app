const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
const upload = require("../middleware/pageupload")


//create
router.post('/', upload.single('Image'),middlewareReponse.verifyToken,pagesController.create,middlewareReponse.saveResponse);
//update
router.put('/:id',upload.single('Image'),middlewareReponse.verifyToken,pagesController.updatepage, middlewareReponse.updateResponse);
router.delete('/:id',middlewareReponse.verifyToken, pagesController.deletepage, middlewareReponse.deleteResponse);
router.get('/:slug',upload.single('Image'),middlewareReponse.verifyToken,pagesController.getpage, middlewareReponse.getByIdResponse);
router.get('/id/:id',middlewareReponse.verifyToken,pagesController.getpagebyid);





module.exports = router;