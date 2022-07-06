
const express = require('express');
const router = express.Router();
const careersController = require('../controllers/careersController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
const upload = require("../middleware/careersupload")


/**
 * @swagger
 * definitions:
 *   career:
 *     properties:
 *       title:
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
 *         type: string
 *        
 */

//create
router.post('/', upload.single('Image'),middlewareReponse.verifyToken, careersController.create,middlewareReponse.saveResponse);
/**
 * @swagger
 * /api/v1/career:
 *   post:    
 *     security:           
 *      - Bearer: []
 *     tags:
 *       - career
 *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: Creates a new career
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
 *           $ref: '#/definitions/career'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id',upload.single('Image'),middlewareReponse.verifyToken,careersController.updatecareer, middlewareReponse.updateResponse);
  /**
 * @swagger
 * /api/v1/career/{id}: 
 *   put:
 *     security:           
 *       - Bearer: []     
 *     tags:
 *       - career
 *     description: Creates a new career
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: career id to Update
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: Updated career object
 *         required: true
 *         schema:
 *           $ref: '#/definitions/career'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.delete('/:id', middlewareReponse.verifyToken,careersController.deletecareer, middlewareReponse.deleteResponse);
 /**
 * @swagger
 * /api/v1/career/{id}: 
 *   delete:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - career
 *     summary: Deletes a career
 *     description: ''
 *     operationId: deletecareer
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: career id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: career not found   
 * 
 */
router.get('/',upload.single('Image'),middlewareReponse.verifyToken,careersController.getcareer, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/career:
 *   get:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - career
 *     description: Returns all career
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of career       
 *         schema:
 *           $ref: '#/definitions/career'
 *       400:
 *         description: Invalid status value 
 */
router.get('/id/:id',middlewareReponse.verifyToken,careersController.getcareersbyid);
/**
* @swagger
* /api/v1/career/id/{id}: 
*   get:
*     security:           
*       - Bearer: []
*     tags:
*       - career
*     description: get a single career
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: career id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/career' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: career not found
*/ 

module.exports=router;