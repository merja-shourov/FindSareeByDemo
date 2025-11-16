import mongoose from "mongoose";
import dotenv from "dotenv";
import Saree from "../models/Saree.js";
import connectDB from "../config/db.js";

dotenv.config();

const sampleSarees = [
  {
    name: "Elegant Red Silk Saree",
    pricePerDay: 1200,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    description: "Experience timeless beauty with this handcrafted red silk saree, perfect for weddings, receptions, and festivals.",
    material: "Pure Silk",
    color: "Red",
    occasion: "Wedding",
    size: "Free Size",
    available: true,
  },
  {
    name: "Party Wear Blue Georgette Saree",
    pricePerDay: 950,
    image: "https://images.unsplash.com/photo-1583391733981-5aacd4d9ebaa?auto=format&fit=crop&w=800&q=80",
    description: "Stand out at any party with this stunning blue georgette saree featuring intricate embroidery and elegant draping.",
    material: "Georgette",
    color: "Blue",
    occasion: "Party",
    size: "Free Size",
    available: true,
  },
  {
    name: "Casual Cotton Saree",
    pricePerDay: 700,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e7?auto=format&fit=crop&w=800&q=80",
    description: "Comfortable and stylish cotton saree perfect for daily wear and casual occasions.",
    material: "Cotton",
    color: "Green",
    occasion: "Casual",
    size: "Free Size",
    available: true,
  },
  {
    name: "Traditional Yellow Festival Saree",
    pricePerDay: 1100,
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    description: "Celebrate festivals in style with this vibrant yellow traditional saree adorned with beautiful motifs.",
    material: "Silk Blend",
    color: "Yellow",
    occasion: "Festival",
    size: "Free Size",
    available: true,
  },
  {
    name: "Modern Designer Pink Saree",
    pricePerDay: 1800,
    image: "https://images.unsplash.com/photo-1610031805814-7e5e2f9c6a56?auto=format&fit=crop&w=800&q=80",
    description: "Make a fashion statement with this modern designer saree featuring contemporary patterns and luxurious fabric.",
    material: "Designer Silk",
    color: "Pink",
    occasion: "Party",
    size: "Free Size",
    available: true,
  },
  {
    name: "Royal Purple Wedding Saree",
    pricePerDay: 2000,
    image: "https://images.unsplash.com/photo-1632519455252-574e58d40742?auto=format&fit=crop&w=800&q=80",
    description: "Royal purple saree with heavy embellishments, perfect for grand wedding ceremonies.",
    material: "Banarasi Silk",
    color: "Purple",
    occasion: "Wedding",
    size: "Free Size",
    available: true,
  },
  {
    name: "Elegant Maroon Traditional Saree",
    pricePerDay: 1300,
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    description: "Classic maroon saree with traditional patterns, ideal for cultural events and ceremonies.",
    material: "Kanjivaram Silk",
    color: "Maroon",
    occasion: "Traditional",
    size: "Free Size",
    available: true,
  },
  {
    name: "Peach Chiffon Party Saree",
    pricePerDay: 1050,
    image: "https://images.unsplash.com/photo-1583391733980-2775db01f0c8?auto=format&fit=crop&w=800&q=80",
    description: "Light and flowy peach chiffon saree perfect for evening parties and social gatherings.",
    material: "Chiffon",
    color: "Peach",
    occasion: "Party",
    size: "Free Size",
    available: true,
  },
];

const seedSarees = async () => {
  try {
    await connectDB();
    
    // Clear existing sarees (optional)
    await Saree.deleteMany({});
    console.log("Existing sarees cleared");

    // Insert sample sarees
    const createdSarees = await Saree.insertMany(sampleSarees);
    console.log(`${createdSarees.length} sarees successfully seeded!`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding sarees:", error);
    process.exit(1);
  }
};

seedSarees();

