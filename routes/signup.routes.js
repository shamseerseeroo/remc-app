const express = require('express');
const rateLimit = require('express-rate-limit');


const router = express.Router();
const signup = require('../controllers/signupController');
const middlewareReponse = require('../middleware/response');

/**
 * @swagger
 * definitions:
 *   signup:
 *     properties:
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

router.post("/",signup.postdata)

/** 
*   post:
*     tags:
*       - signin
*     summary: Create a user
*     description: Creates a new user
*     produces:
*       - application/json
*     parameters:
*       - name: Auth
*         description: user object
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/signin'
*     responses:
*       200:
*         description: Successfully created
*/



module.exports=router;