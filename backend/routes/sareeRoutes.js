import express from "express";
import {
  getAllSarees,
  getSareeById,
  createSaree,
  updateSaree,
  deleteSaree,
} from "../controller/sareeController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

// Public routes
router.get("/", getAllSarees);
router.get("/:id", getSareeById);

// Admin only routes
router.post("/", protect, admin, upload.single('image'), createSaree);
router.put("/:id", protect, admin, upload.single('image'), updateSaree);
router.delete("/:id", protect, admin, deleteSaree);

export default router;

