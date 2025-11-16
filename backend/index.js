import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import rentalRoutes from './routes/rentalRoutes.js'
import sareeRoutes from './routes/sareeRoutes.js'

import connectDB from "./config/db.js";
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// middleware
app.use(cors())
app.use(express.json());

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/sarees', sareeRoutes);


const PORT = process.env.PORT || 5001;
app.listen( PORT, ()=> console.log(`server running on port ${PORT}`));

