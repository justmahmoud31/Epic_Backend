import { body } from 'express-validator';

export const productValidator = [
  body('name').notEmpty().withMessage("name is Required"),
  body('description').optional(),
  body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('model').optional(),
  body('imageCover').notEmpty().withMessage('Cover image is required'),
  body('images').isArray().withMessage('Images must be an array'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('category').isMongoId().withMessage('Category must be a valid ID'),
];
