import { singUp, singIn, profile } from '../controllers/auth';
import { Router } from 'express';
import { TokenValidation } from '../middlewares/verifyToken';
const router: Router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: The user's username
 *        email:
 *          type: string
 *          description: The user's email
 *        password:
 *          type: string
 *          description: The user's password
 *        imageProfile:
 *          type: string
 *          description: The user's imageProfile
 *        favorites:
 *          type: array
 *          description: The user's favorites songs
 *      required:
 *        - username
 *        - email
 *        - password
 *      example:
 *        username: John Doe
 *        email: JohnDoe@gmail.com
 *        password: 123456
 *        imageProfile: https://ui-avatars.com/api/?name=John Doe&color=fff&background=random&size=400&font-size=0.5&rounded=true
 *        favorites: []
 *    Favorites:
 *      type: object
 *      properties:
 *        idTitle:
 *          type: number
 *          description: The idTitle of the song
 *        idUser:
 *          type: string
 *          description: The idUser of the user
 *        active:
 *          type: boolean
 *          description: The active of the song
 *      required:
 *        - idTitle
 *        - idUser
 *        - active
 *      example:
 *        idTitle: 1533348982
 *        idUser: 5f9f1b0b0b9b9c1b8c8c8c8c
 *        active: true
 *
 *  parameters:
 *    idUser:
 *      in: path
 *      name: idUser
 *      required: true
 *      schema:
 *        type: string
 *      description: The idUser of the user
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth endpoint
 */

/**
 * @swagger
 * /auth/singup:
 *  post:
 *    summary: use to create a new user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Email already exists
 *
 */

router.post('/singup', singUp);

/**
 * @swagger
 * /auth/singin:
 *  post:
 *    summary: use to sing in a user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was successfully sing in
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Email is wrong
 *      401:
 *        description: Password is wrong
 *
 */

router.post('/singin', singIn);

/**
 * @swagger
 * /auth/profile:
 *  get:
 *    summary: use to get the profile of a user
 *    tags: [Auth]
 *    responses:
 *      200:
 *        description: The user was successfully get
 *        content:
 *          text/plain:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Token is wrong
 */

router.get('/profile', TokenValidation, profile);

export default router;
