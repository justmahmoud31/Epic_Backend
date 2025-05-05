/**
 * @swagger
 * components:
 *   schemas:
 *     Verification:
 *       type: object
 *       required:
 *         - userId
 *         - productId
 *         - verificationImage
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the verification
 *         userId:
 *           type: string
 *           description: ID of the user who verified
 *         productId:
 *           type: string
 *           description: ID of the product being verified
 *         verifiedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of verification
 *         verificationImage:
 *           type: string
 *           description: Path to the uploaded verification image
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  verifiedAt: {
    type: Date,
    default: Date.now
  },
  verificationImage : {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Verification = mongoose.model('Verification', verificationSchema);

export default Verification;
