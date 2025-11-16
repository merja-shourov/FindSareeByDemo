import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "User already exist!" });
    }

    // create user & response
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    //  localStorage.setItem("user", JSON.stringify(user));


    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: ` error ${error.message}` });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid credintial" });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Return user data without password
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin || false
    };

    res.json({ success: true, message: "Login successful", user: userData, token });

  }catch(error) {
    res.status(500).json({ message: error.message });
  }
};

// default router
export const defautRoute = async (req, res) => {
  res.send("hello world");
};
