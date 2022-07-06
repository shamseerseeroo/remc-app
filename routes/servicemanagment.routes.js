
const rateLimit = require('express-rate-limit');

const express = require('express');
const router = express.Router();
const servicemanagmentController = require('../controllers/servicemanagmentController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
const upload = require("../middleware/serviceupload")



/**
 * @swagger
 * definitions:
 *   service:
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       Image:
 *         type: string
 *       status:
 *         type: Boolean
 *       sortorder:
 *         type: string
 *       createdby:
 *         type: string
 *       
 *        
 */
//create
router.post('/', upload.single('Image'),middlewareReponse.verifyToken, servicemanagmentController.create,middlewareReponse.saveResponse);
/**
 * @swagger
 * /api/v1/service:
 *   post:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - service
  *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: Creates a new service
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: Image
 *         type: file
 *         description: The file to upload
 *       - in: formData
 *         name: title
 *         type: string
 *         required: true
 *       - in: formData
 *         name: description
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
 *           $ref: '#/definitions/service'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id',upload.single('Image'),middlewareReponse.verifyToken,servicemanagmentController.updateservice, middlewareReponse.updateResponse);
  /**
 * @swagger
 * /api/v1/service/{id}: 
 *   put:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - service
 *     description: Creates a new service
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: service id to Update
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: Updated service object
 *         required: true
 *         schema:
 *           $ref: '#/definitions/service'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.delete('/:id', middlewareReponse.verifyToken,servicemanagmentController.deleteservice, middlewareReponse.deleteResponse);
  /**
 * @swagger
 * /api/v1/service/{id}: 
 *   delete:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - service
 *     summary: Deletes a service
 *     description: ''
 *     operationId: deleteservice
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: service id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: service not found   
 * 
 */  
router.get('/',upload.single('Image'),middlewareReponse.verifyToken,servicemanagmentController.getservice, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/service:
 *   get:
 *     security:           
 *       - Bearer: [] 
 *     tags:
 *       - service
 *     description: Returns all pages
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of service       
 *         schema:
 *           $ref: '#/definitions/service'
 *       400:
 *         description: Invalid status value 
 */
router.get('/id/:id',middlewareReponse.verifyToken,servicemanagmentController.getservicebyid);
/**
* @swagger
* /api/v1/service/{slug}: 
*   get:
*     security:           
*       - Bearer: []
*     tags:
*       - service
*     description: get a single slug
*     produces:
*        - application/json
*     parameters:
*       - name: slug
*         in: path
*         description: slug to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/service' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: page not found
*/ 
router.get('/:slug',middlewareReponse.verifyToken,servicemanagmentController.getbyslug, middlewareReponse.getByIdResponse);
/**
* @swagger
* /api/v1/service/id/{id}: 
*   get:
*     security:           
*       - Bearer: []
*     tags:
*       - service
*     description: get a single page
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: service id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/service' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: service not found
*/ 


module.exports=router;