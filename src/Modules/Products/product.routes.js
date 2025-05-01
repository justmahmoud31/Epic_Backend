import express from 'express';
import { createProduct, getAllProducts, editProduct, deleteProduct } from './product.controller.js';
import upload from '../../config/MulterConfig.js'; // Assuming multer config is in the 'config' folder
import { productValidator } from './product.validator.js'; // Optional: Add validation for your product model
import validate from '../../config/validate.js';
import protect from '../../Middlewares/authMiddleware.js';
import allowRoles from '../../Middlewares/roleMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15
 *               description:
 *                 type: string
 *                 example: Latest Apple smartphone
 *               price:
 *                 type: number
 *                 example: 999.99
 *               model:
 *                 type: string
 *                 example: A310
 *               stock:
 *                 type: integer
 *                 example: 20
 *               category:
 *                 type: string
 *                 example: 60d9a81f52a4d9d25fa68a62  # Example category ID
 *               imageCover:
 *                 type: string
 *                 format: binary
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               required:
 *                 - name
 *                 - description
 *                 - price
 *                 - model
 *                 - imageCover
 *                 - stock
 *                 - category
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation or creation error
 */
router.post('/', protect, allowRoles('admin'), validate, productValidator, upload.fields([{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 10 }]), createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products with optional filters
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Filter by product ID
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by product name (partial match)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: model
 *         schema:
 *           type: string
 *         description: Filter by product model
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15
 *               description:
 *                 type: string
 *                 example: Latest Apple smartphone
 *               price:
 *                 type: number
 *                 example: 999.99
 *               model:
 *                 type: string
 *                 example: A310
 *               stock:
 *                 type: integer
 *                 example: 20
 *               category:
 *                 type: string
 *                 example: 60d9a81f52a4d9d25fa68a62
 *               imageCover:
 *                 type: string
 *                 format: binary
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.put('/:id', protect, allowRoles('admin'), upload.fields([{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 10 }]), editProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/:id', protect, allowRoles('admin'), deleteProduct);

export default router;
