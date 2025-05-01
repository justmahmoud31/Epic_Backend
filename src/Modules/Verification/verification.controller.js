// src/Modules/Verification/verification.controller.js

import Verification from './verification.model.js';

export const addVerification = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const verification = await Verification.create({ userId, productId });

    res.status(201).json({ message: 'Product verified', verification });
  } catch (error) {
    res.status(500).json({ message: 'Verification failed', error: error.message });
  }
};
