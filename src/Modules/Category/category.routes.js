import express from 'express';
import {
    createCategory,
    getAllCategories,
    editCategory,
    deleteCategory
} from './category.controller.js';
import { categoryValidator } from './category.validator.js';
import validate from '../../config/validate.js';
import upload from '../../config/MulterConfig.js';


const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category with image
 *     tags: [Categories]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Validation or creation error
 */
// Category image route
router.post('/', 
    upload.single('image'),  // Ensure this middleware runs first to handle image uploads
    categoryValidator,  // Your validation logic
    validate,  // Additional validation
    createCategory  // Controller to create the category
  );


/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories with optional filters
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by category name (partial match)
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/', getAllCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category and optionally its image
 *     tags: [Categories]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Update error
 *       404:
 *         description: Category not found
 */
router.put('/:id', upload.single('image'), categoryValidator, validate, editCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category and its image
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete('/:id', deleteCategory);

export default router;
