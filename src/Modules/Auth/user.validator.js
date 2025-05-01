import { body } from 'express-validator';

export const userValidationRules = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .trim(),

  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .trim(),

  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Phone number must be valid'),
];
