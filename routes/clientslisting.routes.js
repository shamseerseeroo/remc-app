
const express = require('express');
const router = express.Router();
const clientlistingController = require('../controllers/clientlistingController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
const upload = require("../middleware/clientlistingupload")


/**
 * @swagger
 * definitions:
 *   clientlisting:
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       Image:
 *         type: string
 *       status:
 *         type: Boolean
 *       createdby:
 *         type: string
 *       sortorder:
 *         type: Number
 *        
 */
//create
//create
router.post('/', upload.single('Image'),middlewareReponse.verifyToken, clientlistingController.create,middlewareReponse.saveResponse);
/**
 * @swagger
 * /api/v1/clientlisting:
 *   post:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - clientlisting
 *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: Creates a new clientlisting
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: Image
 *         type: file
 *         description: The file to upload
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *       - in: formData
 *         name: description
 *         type: string
 *         required: true
 *       - in: formData
 *         name: status
 *         type: string
 *         required: true
 *       - in: formData
 *         name: sortorder
 *         type: string
 *         required: true
 *       - in: formData
 *         name: userId
 *         type: string
 *         required: true
 *         schema:
 *           $ref: '#/definitions/clientlisting'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id',upload.single('Image'),middlewareReponse.verifyToken,clientlistingController.updateclientlisting, middlewareReponse.updateResponse);
  /**
 * @swagger
 * /api/v1/clientlisting/{id}: 
 *   put:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - clientlisting
 *     description: Creates a new clientlisting
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: clientlisting id to Update
 *         required: true
 *         type: string
 *       - in: formData
 *         name: Image
 *         type: file
 *         description: The file to upload
 *       - in: formData
 *         name: name
 *         type: string
 *       - in: formData
 *         name: description
 *         type: string
 *       - in: formData
 *         name: status
 *         type: string
 *       - in: formData
 *         name: sortorder
 *         type: string
 *       - in: formData
 *         name: userId
 *         type: string
 *         schema:
 *           $ref: '#/definitions/clientlisting'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.delete('/:id', middlewareReponse.verifyToken,clientlistingController.deleteclientlisting, middlewareReponse.deleteResponse);
  /**
 * @swagger
 * /api/v1/clientlisting/{id}: 
 *   delete:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - clientlisting
 *     summary: Deletes a clientlist
 *     description: ''
 *     operationId: deleteclientlist
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: clientlist id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: clientlist not found   
 * 
 */
router.get('/',upload.single('Image'),middlewareReponse.verifyToken,clientlistingController.getclientlisting, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/clientlisting:
 *   get:
 *     security:           
 *       - Bearer: [] 
 *     tags:
 *       - clientlisting
 *     description: Returns all clientlisting
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of clientlisting       
 *         schema:
 *           $ref: '#/definitions/clientlisting'
 *       400:
 *         description: Invalid status value 
 */
router.get('/:id',middlewareReponse.verifyToken,clientlistingController.getclientlistingbyid);
/**
* @swagger
* /api/v1/clientlisting/{id}: 
*   get:
*     security:           
*       - Bearer: []
*     tags:
*       - clientlisting
*     description: get a single clientlisting
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: clientlist id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/clientlisting' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: clientlist not found
*/ 
router.get('/client/status',   clientlistingController.getclientlistingstatus, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/clientlisting/client/status:
 *   get:
 *     tags:
 *       - clientlisting
 *     description: Returns status clientlisting
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of clientlisting       
 *         schema:
 *           $ref: '#/definitions/clientlisting'
 *       400:
 *         description: Invalid status value 
 */

module.exports=router;