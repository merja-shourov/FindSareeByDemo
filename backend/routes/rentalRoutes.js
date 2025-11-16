import express from "express";
import {
  createRental,
  getUserRentals,
  getAllRentals,
  updateRentalStatus,
} from "../controller/rentalController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes (protected)
router.post("/", protect, createRental);
router.get("/my-rentals", protect, getUserRentals);

// Admin routes
router.get("/all", protect, adminOnly, getAllRentals);
router.put("/:rentalId/status", protect, adminOnly, updateRentalStatus);

export default router;


