
const express = require('express');
const router = express.Router();
const contactusController = require('../controllers/contactusController');
const middlewareReponse = require('../middleware/response');



//create
router.post('/',middlewareReponse.verifyToken, contactusController.create,middlewareReponse.saveResponse);
//update
router.put('/:id',middlewareReponse.verifyToken,contactusController.updatecontactus, middlewareReponse.updateResponse);
router.delete('/:id', middlewareReponse.verifyToken,contactusController.deletecontactus, middlewareReponse.deleteResponse);
router.get('/',middlewareReponse.verifyToken,contactusController.getcontactus, middlewareReponse.getByIdResponse);

module.exports=router;