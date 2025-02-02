import { Router } from 'express';
import { UserController } from './user.controller';
import { loginSchema, registerUserSchema } from './user.schema';
import { validateSchema } from '../../middlewares/validateSchema';
import { authenticate } from '../../middlewares/auth';


const userController = new UserController();
const userRouter = Router();



/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Add a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - surname
 *               - email
 *               - username
 *               - phone
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juan"
 *               surname:
 *                 type: string
 *                 example: "Perez"
 *               email:
 *                 type: string
 *                 example: "juan@example.com"
 *               username:
 *                 type: string
 *                 example: "juan123"
 *               phone:
 *                 type: string
 *                 example: "+123456789"
 *               password:
 *                 type: string
 *                 example: "secPassw12"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid data
 *     security: []
 */
userRouter.post('/register', validateSchema(registerUserSchema), userController.register);


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "juan123"
 *               password:
 *                 type: string
 *                 example: "secPassw12"
 *     responses:
 *       200:
 *         description: Sesión iniciada exitosamente
 *       401:
 *         description: Credenciales inválidas
 *     security: []
 */
userRouter.post('/login', validateSchema(loginSchema),userController.login);


export default userRouter;