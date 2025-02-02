import { Router } from 'express';
import { OrderController } from './order.controller';
import { createOrderItemSchema } from './order-item.schema';
import { validateSchema } from '../../middlewares/validateSchema';
import { authenticate } from '../../middlewares/auth';

const orderController = new OrderController();
const orderRouter = Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderItems
 *             properties:
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "550e8400-e29b-41d4-a716-446655440000"
 *                     quantity:
 *                       type: number
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid data
 *     security:
 *       - bearerAuth: []
 */
orderRouter.post('/', [authenticate, validateSchema(createOrderItemSchema)], orderController.createOrder);

/**
 * @swagger
 * /orders/user:
 *   get:
 *     summary: Get all orders by user
 *     tags: [Orders]
 *     parameters:
 *      - in: query
 *        name: page
 *        required: true
 *        schema:
 *          type: integer
 *          default: 1
 *      - in: query
 *        name: pageSize
 *        required: true
 *        schema:
 *          type: integer
 *          default: 10
 *     responses:
 *       200:
 *         description: Return all orders by user
 *     security:
 *       - bearerAuth: []
 */
orderRouter.get('/user', [authenticate], orderController.findOrdersByUserId);



/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order id
 *         schema:
 *           type: string
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Return order
 *       404:
 *         description: Order not found
 *     security: []
 */
orderRouter.get('/:id',authenticate ,orderController.findOrderById);


export default orderRouter;