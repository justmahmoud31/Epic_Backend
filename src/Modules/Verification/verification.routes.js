// src/Modules/Verification/verification.routes.js

import express from 'express';
import upload from '../../config/MulterConfig.js'; // Adjust path if needed
import { addVerification, getAllVerifications, getMyVerification } from './verification.controller.js';
import protect from '../../Middlewares/authMiddleware.js';
import allowRoles from '../../Middlewares/roleMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/verification:
 *   post:
 *     summary: Submit a verification for a product
 *     tags: [Verification]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               verificationImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Verification'
 *       400:
 *         description: Missing required fields or image
 *       500:
 *         description: Internal server error
 */

router.post(
    '/', upload.single('verificationImage'), 
    addVerification
);
/**
 * @swagger
 * /api/verification:
 *   get:
 *     summary: Get all verifications with optional filters
 *     tags: [Verification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Filter by verification ID
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *         description: Filter by product ID
 *     responses:
 *       200:
 *         description: List of verifications
 */
router.get('/', protect, allowRoles('admin'), getAllVerifications);
/**
 * @swagger
 * /api/verification/me:
 *   get:
 *     summary: Get all verifications for the authenticated user
 *     tags: [Verification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of verifications for the authenticated user
 */
router.get('/me', protect, getMyVerification);
export default router;
