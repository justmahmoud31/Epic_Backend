/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - image
 *       properties:
 *         name:
 *           type: string
 *           example: Electronics
 *         image:
 *           type: string
 *           example: /uploads/electronics.jpg
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    image: { type: String, required: true }
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
