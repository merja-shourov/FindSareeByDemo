import Saree from "../models/Saree.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get all sarees
export const getAllSarees = async (req, res) => {
  try {
    const sarees = await Saree.find({}).sort({ createdAt: -1 });
    res.json({ success: true, sarees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single saree by ID
export const getSareeById = async (req, res) => {
  try {
    const saree = await Saree.findById(req.params.id);
    if (!saree) {
      return res.status(404).json({ message: "Saree not found" });
    }
    res.json({ success: true, saree });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new saree (Admin only)
export const createSaree = async (req, res) => {
  try {
    const { name, pricePerDay, description, material, color, occasion, size, available, image } = req.body;

    // Check if image is provided either via file upload or URL
    let imageUrl = image;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    if (!imageUrl) {
      return res.status(400).json({ message: "Image is required" });
    }

    const saree = new Saree({
      name,
      pricePerDay: Number(pricePerDay),
      image: imageUrl,
      description,
      material,
      color,
      occasion,
      size: size || "Free Size",
      available: available !== undefined ? available : true,
    });

    await saree.save();
    res.status(201).json({ success: true, message: "Saree created successfully", saree });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update saree (Admin only)
export const updateSaree = async (req, res) => {
  try {
    const { name, pricePerDay, description, material, color, occasion, size, available, image } = req.body;
    const saree = await Saree.findById(req.params.id);

    if (!saree) {
      return res.status(404).json({ message: "Saree not found" });
    }

    // Update image if new file uploaded
    let imageUrl = saree.image;
    if (req.file) {
      // Delete old image if it was a local file
      if (saree.image && saree.image.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '..', saree.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (image) {
      imageUrl = image;
    }

    if (name) saree.name = name;
    if (pricePerDay) saree.pricePerDay = Number(pricePerDay);
    if (description) saree.description = description;
    if (material) saree.material = material;
    if (color) saree.color = color;
    if (occasion) saree.occasion = occasion;
    if (size) saree.size = size;
    if (available !== undefined) saree.available = available;
    saree.image = imageUrl;

    await saree.save();
    res.json({ success: true, message: "Saree updated successfully", saree });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete saree (Admin only)
export const deleteSaree = async (req, res) => {
  try {
    const saree = await Saree.findById(req.params.id);

    if (!saree) {
      return res.status(404).json({ message: "Saree not found" });
    }

    // Delete image file if it was a local file
    if (saree.image && saree.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', saree.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Saree.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Saree deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

