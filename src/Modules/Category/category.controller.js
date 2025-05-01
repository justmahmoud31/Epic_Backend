import Category from './category.model.js';
import fs from 'fs';
import path from 'path';

// Create a new category with image
export const createCategory = async (req, res) => {
  try {
    const imagePath = req.file ? `uploads/general/${req.file.filename}` : undefined;
    if (!imagePath) {
      return res.status(400).json({ message: 'Image is required' });
    }
    // Check if category with the same name already exists
    const existingCategory = await Category.findOne({ name: req.body.name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }
    
    const category = new Category({ ...req.body, image: imagePath });

    await category.save();
    res.status(201).json({ message: 'Category created', category });
  } catch (error) {
    res.status(400).json({ message: 'Creation failed', error: error.message });
  }
};
// Get all categories with optional filters: id and name
export const getAllCategories = async (req, res) => {
  try {
    const { id, name } = req.query;
    const filter = {};

    if (id) filter._id = id;
    if (name) filter.name = new RegExp(name, 'i');

    const categories = await Category.find(filter);
    res.status(200).json({
      message: 'Categories fetched successfully',
      count: categories.length,
      categories
    });
  } catch (error) {
    res.status(500).json({ message: 'Fetching failed', error: error.message });
  }
};

// Edit a category with optional new image
export const editCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    // Delete old image if new one is uploaded
    if (req.file && category.image) {
      fs.unlink(path.resolve(category.image), err => {
        if (err) console.warn('Failed to delete old image:', err.message);
      });
    }

    const updatedData = {
      ...req.body,
      image: req.file ? `uploads/general/${req.file.filename}` : category.image,
    };

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ message: 'Category updated', category: updatedCategory });
  } catch (error) {
    res.status(400).json({ message: 'Update failed', error: error.message });
  }
};

// Delete a category and its image
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    if (category.image) {
      fs.unlink(path.resolve(category.image), err => {
        if (err) console.warn('Failed to delete image:', err.message);
      });
    }

    res.status(200).json({ message: 'Category deleted', category });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
};
