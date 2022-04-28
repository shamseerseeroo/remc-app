const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
const upload = require("../middleware/upload")


//create
router.post('/', upload.single('Image'),pagesController.create,middlewareReponse.saveResponse);
//update
router.put('/:id',upload.single('Image'),pagesController.updatepage, middlewareReponse.updateResponse);
router.delete('/:id', pagesController.deletepage, middlewareReponse.deleteResponse);
router.get('/:slug',upload.single('Image'),pagesController.getpage, middlewareReponse.getByIdResponse);





module.exports = router;