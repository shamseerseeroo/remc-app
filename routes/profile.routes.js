


const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
const upload = require("../middleware/upload")



//router.post('/', profileController.postdata,upload.single('image'), middlewareReponse.verifyToken);
router.put('/:id', upload.single('image'),middlewareReponse.verifyToken,profileController.updateprofile);
router.get('/:id',middlewareReponse.verifyToken, profileController.getuser);



module.exports = router;