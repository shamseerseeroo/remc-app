const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
const upload = require("../middleware/pageupload")


/**
 * @swagger
 * definitions:
 *   pages:
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
 *       
 *        
 */
//create
router.post('/', upload.single('Image'),middlewareReponse.verifyToken,pagesController.create,middlewareReponse.saveResponse);

/**
 * @swagger
 * /api/v1/pages:
 *   post:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - pages
 *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: Creates a new pages
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
 *         name: status
 *         type: string
 *         required: true
 *       - in: formData
 *         name: userId
 *         type: string
 *         required: true
 *         schema:
 *           $ref: '#/definitions/pages'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id',upload.single('Image'),middlewareReponse.verifyToken,pagesController.updatepage, middlewareReponse.updateResponse);
  /**
 * @swagger
 * /api/v1/pages/{id}: 
 *   put:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - pages
 *     description: update a new pages
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: pages id to Update
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
 *         name: sortorder
 *         type: string
 *       - in: formData
 *         name: status
 *         type: string
 *       - in: formData
 *         name: userId
 *         type: string
 *         schema:
 *           $ref: '#/definitions/pages'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.delete('/:id',middlewareReponse.verifyToken, pagesController.deletepage, middlewareReponse.deleteResponse);
  /**
 * @swagger
 * /api/v1/pages/{id}: 
 *   delete:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - pages
 *     summary: Deletes a page
 *     description: ''
 *     operationId: deletepages
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: page id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: page not found   
 * 
 */  
router.get('/',upload.single('Image'),middlewareReponse.verifyToken,pagesController.getpage, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/pages:
 *   get:
 *     security:           
 *       - Bearer: [] 
 *     tags:
 *       - pages
 *     description: Returns all pages
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of pages       
 *         schema:
 *           $ref: '#/definitions/pages'
 *       400:
 *         description: Invalid status value 
 */
router.get('/:slug',pagesController.getbyslug, middlewareReponse.getByIdResponse);
/**
* @swagger
* /api/v1/pages/{slug}: 
*   get:
*     tags:
*       - pages
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
*           $ref: '#/definitions/pages' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: page not found
*/ 
router.get('/id/:id',pagesController.getpagebyid);
/**
* @swagger
* /api/v1/pages/id/{id}: 
*   get:
*     tags:
*       - pages
*     description: get a single page
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: page id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/pages' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: pages not found
*/ 
router.get('/page/status/',  pagesController.getpagesstatus, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/pages/page/status/:
 *   get:
 *     tags:
 *       - pages
 *     description: Returns status pages
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of pages       
 *         schema:
 *           $ref: '#/definitions/pages'
 *       400:
 *         description: Invalid status value 
 */



module.exports = router;