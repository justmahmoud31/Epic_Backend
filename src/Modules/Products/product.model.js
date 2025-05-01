/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - model
 *         - imageCover
 *         - stock
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           example: iPhone 15
 *         description:
 *           type: string
 *           example: Latest Apple smartphone
 *         price:
 *           type: number
 *           example: 999.99
 *         model:
 *           type: string
 *           example: A310
 *         imageCover:
 *           type: string
 *           example: /uploads/iphone15-cover.jpg
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           example: ["/uploads/img1.jpg", "/uploads/img2.jpg"]
 *         stock:
 *           type: integer
 *           example: 20
 *         category:
 *           type: string
 *           example: 66325b42dd5be3e42055ab91
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        model: { type: String, required: true },
        imageCover: { type: String, required: true },
        images: [{ type: String }],
        stock: { type: Number, required: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
