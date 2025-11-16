import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Get email from command line argument
    const email = process.argv[2];

    if (!email) {
      console.log("Usage: node scripts/createAdmin.js <email>");
      console.log("Example: node scripts/createAdmin.js admin@example.com");
      process.exit(1);
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`❌ User with email ${email} not found!`);
      console.log("Please register this user first, then run this script.");
      process.exit(1);
    }

    // Set user as admin
    user.isAdmin = true;
    await user.save();

    console.log(`✅ User ${user.name} (${user.email}) is now an admin!`);
    console.log("You can now login with this account to access the admin dashboard.");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

createAdmin();


