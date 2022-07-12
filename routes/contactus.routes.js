


const express = require('express');
const router = express.Router();
const contactusController = require('../controllers/contactusController');
const middlewareResponse = require('../middleware/response');



/**
 * @swagger
 * definitions:
 *   contactus:
 *     properties:
 *       email:
 *         type: string
 *       phonenumber:
 *         type: string
 *       address:
 *         type: string
 *       
 *        
 */
//create
router.post('/', middlewareResponse.verifyToken, contactusController.create,middlewareResponse.saveResponse);
/**
 * @swagger
 * /api/v1/contactus:
 *   post:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - contactus
 *     description: Creates a new contactus
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Auth
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/contactus'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id',middlewareResponse.verifyToken,contactusController.updatecontactus, middlewareResponse.updateResponse);
  /**
 * @swagger
 * /api/v1/contactus/{id}: 
 *   put:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - contactus
 *     description: Creates a new contactus
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: contactus id to Update
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: Updated contactus object
 *         required: true
 *         schema:
 *           $ref: '#/definitions/contactus'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.delete('/:id', middlewareResponse.verifyToken,contactusController.deletecontactus, middlewareResponse.deleteResponse);
  /**
 * @swagger
 * /api/v1//{id}: 
 *   delete:
*     security:           
 *       - Bearer: []
 *     tags:
 *       - contactus
 *     summary: Deletes a contactus
 *     description: ''
 *     operationId: deletecontactus
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: contactus id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: contactus not found   
 * 
 */  
router.get('/',middlewareResponse.verifyToken,contactusController.getcontactus, middlewareResponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/contactus:
 *   get:
 *     security:           
 *       - Bearer: [] 
 *     tags:
 *       - contactus
 *     description: Returns all contactus
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of contactus       
 *         schema:
 *           $ref: '#/definitions/contactus'
 *       400:
 *         description: Invalid status value 
 */
router.get('/:id',middlewareResponse.verifyToken,contactusController.getcontactusbyid);
/**
* @swagger
* /api/v1/contactusController/{id}: 
*   get:
*     security:           
*       - Bearer: []
*     tags:
*       - contactus
*     description: get a single contactus
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: contactus id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/contactus' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: contactus not found
*/ 
router.get('/status/', middlewareResponse.verifyToken, contactusController.getcontactusstatus, middlewareResponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/contactus/status/:
 *   get:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - contactus
 *     description: Returns status contactus
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of contactus       
 *         schema:
 *           $ref: '#/definitions/contactus'
 *       400:
 *         description: Invalid status value 
 */

module.exports=router;