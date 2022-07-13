
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
const upload = require("../middleware/blogupload")


/**
 * @swagger
 * definitions:
 *   blog:
 *     properties:
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       Image:
 *         type: string
 *       seotitle:
 *         type: string
  *       sortorder:
 *         type: string
 *       metatitle:
 *         type: string
 *       metadescription:
 *         type: string
 *       createdby:
 *         type: string
 *        
 */

//create
router.post('/', upload.single('Image'),middlewareReponse.verifyToken, blogController.create,middlewareReponse.saveResponse);
/**
 * @swagger
 * /api/v1/blog:
 *   post:    
 *     security:           
 *      - Bearer: []
 *     tags:
 *       - blog
 *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: Creates a new blog
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
 *         name: content
 *         type: string
 *         required: true
 *       - in: formData
 *         name: sortorder
 *         type: string
 *         required: true
 *       - in: formData
 *         name: userId
 *         type: string
 *       - in: formData
 *         name: status
 *         type: string
 *       - in: formData
 *         name: seotitle
 *         type: string
 *       - in: formData
 *         name: metatitle
 *         type: string
 *       - in: formData
 *         name: metadescription
 *         type: string
 *         required: true
 *       - in: formData
 *         name: tag
 *         type: string
 *         required: true
 *         schema:
 *           $ref: '#/definitions/blog'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id',upload.single('Image'),middlewareReponse.verifyToken,blogController.updateblog, middlewareReponse.updateResponse);
  /**
 * @swagger
 * /api/v1/blog/{id}: 
 *   put:
 *     security:           
 *       - Bearer: []     
 *     tags:
 *       - blog
 *     description: Creates a new blog
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: blog id to Update
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
 *         name: content
 *         type: string
 *       - in: formData
 *         name: sortorder
 *         type: string
 *       - in: formData
 *         name: userId
 *         type: string
 *       - in: formData
 *         name: status
 *         type: string
 *       - in: formData
 *         name: seotitle
 *         type: string
 *       - in: formData
 *         name: metatitle
 *         type: string
 *       - in: formData
 *         name: metadescription
 *         type: string
 *       - in: formData
 *         name: tag
 *         type: string
 *         schema:
 *           $ref: '#/definitions/blog'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.delete('/:id', middlewareReponse.verifyToken,blogController.deleteblog, middlewareReponse.deleteResponse);
 /**
 * @swagger
 * /api/v1/blog/{id}: 
 *   delete:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - blog
 *     summary: Deletes a blog
 *     description: ''
 *     operationId: deleteblog
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: blog id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: blog not found   
 * 
 */
router.get('/',blogController.getblog, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/blog:
 *   get:
 *     tags:
 *       - blog
 *     description: Returns all blog
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of blog       
 *         schema:
 *           $ref: '#/definitions/blog'
 *       400:
 *         description: Invalid status value 
 */
router.get('/id/:id',middlewareReponse.verifyToken,blogController.getblogbyid);
/**
* @swagger
* /api/v1/blog/id/{id}: 
*   get:
*     security:           
*       - Bearer: []
*     tags:
*       - blog
*     description: get a single blog
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: blog id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/blog' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: blog not found
*/ 
router.get('/status/',  blogController.getblogstatus, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/blog/status/:
 *   get:
 *     tags:
 *       - blog
 *     description: Returns status blog
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of blog       
 *         schema:
 *           $ref: '#/definitions/blog'
 *       400:
 *         description: Invalid status value 
 */

module.exports=router;