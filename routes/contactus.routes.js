


const express = require('express');
const router = express.Router();
const contactusController = require('../controllers/contactusController');
const middlewareResponse = require('../middleware/response');




//create
router.post('/', middlewareResponse.verifyToken, contactusController.create,middlewareResponse.saveResponse);
//update
router.put('/:id',middlewareResponse.verifyToken,contactusController.updatecontactus, middlewareResponse.updateResponse);
router.delete('/:id', middlewareResponse.verifyToken,contactusController.deletecontactus, middlewareResponse.deleteResponse);
router.get('/',middlewareResponse.verifyToken,contactusController.getcontactus, middlewareResponse.getByIdResponse);
router.get('/:id',middlewareResponse.verifyToken,contactusController.getcontactusbyid);


module.exports=router;