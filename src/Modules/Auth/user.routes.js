/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

import express from 'express';
import { signup, login } from './user.controller.js';
import { userValidationRules } from './user.validator.js';
import validate from '../../config/validate.js';

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

export default router;
