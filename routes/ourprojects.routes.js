
const express = require('express');
const router = express.Router();
const ourprojectsController = require('../controllers/ourprojectsController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
const upload = require("../middleware/ourprojectsupload")


/**
 * @swagger
 * definitions:
 *   ourprojects:
 *     properties:
 *       title :
 *         type: string
 *       description:
 *         type: string
 *       content:
 *         type: string
 *       Image:
 *         type: string
 *       status:
 *         type: Boolean
 *       sortorder:
 *         type: string
 *       
 *        
 */
//create
router.post('/', upload.single('Image'),middlewareReponse.verifyToken, ourprojectsController.create,middlewareReponse.saveResponse);
/**
 * @swagger
 * /api/v1/ourprojects:
 *   post:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - ourprojects
  *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: Creates a new ourprojects
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
 *         name: content
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
 *         schema:
 *           $ref: '#/definitions/ourteam'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id',upload.single('Image'),middlewareReponse.verifyToken,ourprojectsController.updateourprojects, middlewareReponse.updateResponse);
  /**
 * @swagger
 * /api/v1/ourprojects/{id}: 
 *   put:
 *     security:           
 *       - Bearer: []     
 *     tags:
 *       - ourprojects
 *     description: Creates a new ourprojects
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ourprojects id to Update
 *         required: true
 *         type: string
 *       - in: formData
 *         name: Image
 *         type: file
 *         description: The file to upload
 *       - in: formData
 *         name: title
 *         type: string
 *       - in: formData
 *         name: description
 *         type: string
 *       - in: formData
 *         name: content
 *         type: string
 *         required: true
  *       - in: formData
 *         name: status
 *         type: string
 *       - in: formData
 *         name: sortorder
 *         type: string
 *         schema:
 *           $ref: '#/definitions/ourprojects'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.delete('/:id', middlewareReponse.verifyToken,ourprojectsController.deleteourprojects, middlewareReponse.deleteResponse);
  /**
 * @swagger
 * /api/v1/ourprojects/{id}: 
 *   delete:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - ourprojects
 *     summary: Deletes a ourprojects
 *     description: ''
 *     operationId: deleteourprojects
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ourprojects id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: ourprojects not found   
 * 
 */ 
router.get('/',upload.single('Image'),middlewareReponse.verifyToken,ourprojectsController.getourprojects, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/ourprojects:
 *   get:
 *     security:           
 *       - Bearer: [] 
 *     tags:
 *       - ourprojects
 *     description: Returns all ourprojects
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of ourprojects       
 *         schema:
 *           $ref: '#/definitions/ourprojects'
 *       400:
 *         description: Invalid status value 
 */
router.get('/:id',middlewareReponse.verifyToken,ourprojectsController.getourprojectsbyid);
/**
* @swagger
* /api/v1/ourprojects/{id}: 
*   get:
*     security:           
*       - Bearer: []
*     tags:
*       - ourprojects
*     description: get a single ourprojects
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: ourprojects id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/ourprojects' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: ourprojects not found
*/
router.get('/project/status/',  ourprojectsController.getourprojectsstatus, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/ourprojects/project/status/:
 *   get:
 *     tags:
 *       - ourprojects
 *     description: Returns status ourprojects
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of ourprojects       
 *         schema:
 *           $ref: '#/definitions/ourprojects'
 *       400:
 *         description: Invalid status value 
 */

module.exports=router;