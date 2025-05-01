/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

import express from 'express';
import { signup, login, getAllUsers, deleteUserById, updateUserById } from './user.controller.js';
import { userValidationRules } from './user.validator.js';
import validate from '../../config/validate.js';
import protect from '../../Middlewares/authMiddleware.js';
import allowRoles from '../../Middlewares/roleMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation or user exists error
 */
router.post('/signup', userValidationRules, validate, signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@admin.com
 *               password:
 *                 type: string
 *                 example: Admin@1
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', login);
/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Get all users (admin-only, with filters)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: Filter by user role
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter by user email
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Filter by user ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       email:
 *                         type: string
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       role:
 *                         type: string
 *       403:
 *         description: Access denied
 */

router.get('/users', protect, allowRoles('admin'), getAllUsers);
/**
 * @swagger
 * /api/auth/user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
router.put('/user/:id', protect, allowRoles('admin'), updateUserById);

/**
 * @swagger
 * /api/auth/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID of the user
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete('/user/:id', protect, allowRoles('admin'), deleteUserById);
export default router;
