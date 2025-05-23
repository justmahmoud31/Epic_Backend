import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './user.models.js';
import mongoose from 'mongoose';
const JWT_SECRET = process.env.JWT_SECRET; // ideally from .env
const JWT_EXPIRES_IN = '7d'; // adjust as needed

export const signup = async (req, res) => {
    const { email, password, firstName, lastName, phone } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
        });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        res.status(201).json({ token, user: { id: user._id, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Signup failed', error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        res.status(200).json({ access_token: token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};
export const getAllUsers = async (req, res) => {
    try {
        const { role, id, email } = req.query;

        const filter = {};

        if (role) {
            filter.role = role;
        }

        if (email) {
            filter.email = email;
        }

        if (id && mongoose.Types.ObjectId.isValid(id)) {
            filter._id = id;
        }

        const users = await User.find(filter);

        res.status(200).json({
            message: 'Users fetched successfully',
            users: users.map(user => ({
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            })),
        });
    } catch (error) {
        res.status(500).json({ message: 'Fetching users failed', error: error.message });
    }
};
export const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const user = await User.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
};
export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User deleted successfully',
            user,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
};