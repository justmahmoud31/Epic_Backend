import Product from './product.model.js';
import fs from 'fs';
import path from 'path';

// Create product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, model, stock, category } = req.body;

    const imageCover = (req.files?.imageCover?.[0]?.path) ? `uploads/general/${req.files.imageCover[0].filename}` : undefined;
    const images = (req.files?.images?.map(file => file.path) ) ? req.files.images.map(file => `uploads/general/${file.filename}`) : undefined;

    if (!imageCover) {
      return res.status(400).json({ message: 'Cover image is required' });
    }

    const product = new Product({
      name,
      description,
      price,
      model,
      imageCover,
      images,
      stock,
      category
    });

    await product.save();
    res.status(201).json({ message: 'Product created', product });

  } catch (error) {
    res.status(500).json({ message: 'Creation failed', error: error.message });
  }
};

// Get all products with filters
export const getAllProducts = async (req, res) => {
  try {
    const { id, name, model, category } = req.query;
    const filter = {};

    if (id) filter._id = id;
    if (name) filter.name = new RegExp(name, 'i');
    if (model) filter.model = new RegExp(model, 'i');
    if (category) filter.category = category;

    const products = await Product.find(filter).populate('category');
    res.status(200).json({ message: 'Products fetched', count: products.length, products });

  } catch (error) {
    res.status(500).json({ message: 'Fetch failed', error: error.message });
  }
};

// Update product
export const editProduct = async (req, res) => {
  try {
    const existing = await Product.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Product not found' });

    const { name, description, price, model, stock, category } = req.body;
    const newImageCover = req.files?.imageCover?.[0]?.path;
    const newImages = req.files?.images?.map(file => file.path);

    // Clean up old files if replaced
    if (newImageCover && existing.imageCover && fs.existsSync(existing.imageCover)) {
      fs.unlinkSync(existing.imageCover);
    }
    if (newImages?.length && existing.images?.length) {
      existing.images.forEach(img => {
        if (fs.existsSync(img)) fs.unlinkSync(img);
      });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        model,
        stock,
        category,
        imageCover: newImageCover || existing.imageCover,
        images: newImages?.length ? newImages : existing.images
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: 'Product updated', product: updated });

  } catch (error) {
    res.status(400).json({ message: 'Update failed', error: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Delete images
    if (product.imageCover && fs.existsSync(product.imageCover)) {
      fs.unlinkSync(product.imageCover);
    }
    if (product.images?.length) {
      product.images.forEach(img => {
        if (fs.existsSync(img)) fs.unlinkSync(img);
      });
    }

    res.status(200).json({ message: 'Product deleted' });

  } catch (error) {
    res.status(500).json({ message: 'Deletion failed', error: error.message });
  }
};
