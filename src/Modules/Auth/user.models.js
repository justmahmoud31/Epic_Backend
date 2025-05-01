/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *       properties:
 *         email:
 *           type: string
 *           example: user@example.com
 *         password:
 *           type: string
 *           example: StrongPass123
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         phone:
 *           type: string
 *           example: +1234567890
 *       
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    role : {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
