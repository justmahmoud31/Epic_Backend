// src/Modules/Verification/verification.controller.js

import Verification from './verification.model.js';

export const addVerification = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId } = req.body;
        const verificationImage = req.file.path ? `uploads/general/${req.file.filename}` : undefined;
        if (!verificationImage) {
            return res.status(400).json({ message: 'Verification image is required' });
        }
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }
        const verification = await Verification.create({ userId, productId, verificationImage });

        res.status(201).json({ message: 'Product verified', verification });
    } catch (error) {
        res.status(500).json({ message: 'Verification failed', error: error.message });
    }
};
export const getAllVerifications = async (req, res) => {
    try {
        const { id, userId, productId } = req.query;
        const filter = {};
        if (id) filter._id = id;
        if (userId) filter.userId = userId;
        if (productId) filter.productId = productId;

        const verifications = await Verification.find(filter)
            .populate({
                path: 'userId',
                select: 'firstName lastName email'
            })
            .populate('productId'); // Optional: you can also limit fields here if needed

        res.status(200).json({
            message: 'Verifications fetched successfully',
            count: verifications.length,
            verifications
        });
    } catch (error) {
        res.status(500).json({ message: 'Fetching failed', error: error.message });
    }
};
export const getMyVerification = async (req, res) => {
    try {
        console.log(req.user);
        const userId = req.user.userId;
        const verifications = await Verification.find({ userId }).populate('productId'); // adjust field name as needed

        res.status(200).json({
            Message: "Verification Retrieved Successfully",
            verifications
        });
    } catch (error) {
        res.status(500).json({ Message: "Error", Error: error.message });
    }
};
