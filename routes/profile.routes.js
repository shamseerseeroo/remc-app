


const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
const upload = require("../middleware/upload")



//router.post('/', profileController.postdata,upload.single('image'), middlewareReponse.verifyToken);
router.post('/', upload.single('image'),profileController.profile);
router.get('/:id', profileController.getuser);



module.exports = router;