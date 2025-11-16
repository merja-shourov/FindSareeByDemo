import express from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controller/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(admin);

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;


