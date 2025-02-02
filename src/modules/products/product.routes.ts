import { Router } from "express";
import { ProductController } from "./product.controller";
import { createProductSchema, updateProductSchema } from "./product.schema";
import { validateSchema } from "../../middlewares/validateSchema";
import { authenticate } from "../../middlewares/auth";
import { validateJsonFormat } from "../../middlewares/validateJson";

const productController = new ProductController();
const productRouter = Router();

/**
 * @swagger
 * /products/add:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - description
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Champú"
 *               price:
 *                 type: number
 *                 example: 20
 *               description:
 *                 type: string
 *                 example: "Shampoo for all hair types"
 *               quantity:
 *                 type: number
 *                 example: 15
 *     responses:
 *       201:
 *         description: Product added correctly
 *       400:
 *         description: Invalid data
 *     security:
 *       - bearerAuth: []
 */
productRouter.post(
  "/add",
  [authenticate,  validateSchema(createProductSchema)],
  productController.createProduct
);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Return the product
 *       404:
 *         description: Product not found
 *     security: []
 */
productRouter.get("/:id",  productController.getProductById);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *     - in: query
 *       name: page
 *       required: true
 *       schema:
 *         type: integer
 *         default: 1
 *     - in: query
 *       name: pageSize
 *       required: true
 *       schema:
 *         type: integer
 *         default: 10
 *     responses:
 *       200:
 *         description: Return all products
 *       404:
 *         description: Products not found
 *     security: []
 */
productRouter.get("/", productController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - description
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Champú"
 *               price:
 *                 type: number
 *                 example: 20
 *               description:
 *                 type: string
 *                 example: "Shampoo for all hair types"
 *               quantity:
 *                 type: number
 *                 example: 15
 *     responses:
 *       200:
 *         description: Product updated correctly
 *       400:
 *         description: Invalid data
 */
productRouter.patch("/:id",[authenticate, validateSchema(updateProductSchema)],productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted correctly
 *       404:
 *         description: Product not found
 */
productRouter.delete("/:id", authenticate, productController.deleteProduct);

export default productRouter;
