/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

import express from 'express';
import { signup, login, getAllUsers } from './user.controller.js';
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
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: StrongPass123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', login);
/**
 * @swagger
 * /api/auth/admin:
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

router.get('/admin', protect, allowRoles('admin'), getAllUsers);
export default router;
