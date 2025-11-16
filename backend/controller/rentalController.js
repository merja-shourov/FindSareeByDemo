import Rental from "../models/Rental.js";

// Create rental request
export const createRental = async (req, res) => {
  try {
    const {
      sareeId,
      sareeName,
      sareeImage,
      rentalPrice,
      rentalDays,
      startDate,
      endDate,
      phone,
      address,
    } = req.body;

    // Get user info from the authenticated user (from middleware)
    const userId = req.user.id;
    const userName = req.user.name;
    const userEmail = req.user.email;

    const rental = await Rental.create({
      userId,
      userName,
      userEmail,
      sareeId,
      sareeName,
      sareeImage,
      rentalPrice,
      rentalDays,
      startDate,
      endDate,
      phone,
      address,
    });

    res.status(201).json({
      success: true,
      message: "Rental request submitted successfully!",
      rental,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's rentals
export const getUserRentals = async (req, res) => {
  try {
    const userId = req.user.id;
    const rentals = await Rental.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      rentals,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all rentals (Admin only)
export const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      rentals,
      count: rentals.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update rental status (Admin only)
export const updateRentalStatus = async (req, res) => {
  try {
    const { rentalId } = req.params;
    const { status } = req.body;

    const rental = await Rental.findByIdAndUpdate(
      rentalId,
      { status },
      { new: true }
    );

    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }

    res.json({
      success: true,
      message: `Rental ${status} successfully`,
      rental,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


