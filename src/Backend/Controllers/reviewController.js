// reviewController.js
const prisma = require("../prismaClient");

// Fungsi untuk mendapatkan semua review
const getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: true, // Untuk mengambil data user (username)
        drama: true, // Untuk mengambil data drama
      },
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

// Approve reviews
const approveReviews = async (req, res) => {
  const { ids } = req.body; // Array of review IDs to approve
  try {
    await prisma.review.updateMany({
      where: { id: { in: ids } },
      data: { status: true }, // Set status to true for approved reviews
    });
    res.status(200).json({ message: "Reviews approved successfully" });
  } catch (error) {
    console.error("Error approving reviews:", error);
    res.status(500).json({ message: "Error approving reviews" });
  }
};

const unapproveReviews = async (req, res) => {
  const { ids } = req.body; // Array of review IDs to unapprove
  try {
    await prisma.review.updateMany({
      where: { id: { in: ids } },
      data: { status: false }, // Set status to false for unapproved reviews
    });
    res.status(200).json({ message: "Reviews unapproved successfully" });
  } catch (error) {
    console.error("Error unapproving reviews:", error);
    res.status(500).json({ message: "Error unapproving reviews" });
  }
};


// Delete reviews
const deleteReviews = async (req, res) => {
  const { ids } = req.body; // Array of review IDs to delete
  try {
    await prisma.review.deleteMany({
      where: { id: { in: ids } },
    });
    res.status(200).json({ message: "Reviews deleted successfully" });
  } catch (error) {
    console.error("Error deleting reviews:", error);
    res.status(500).json({ message: "Error deleting reviews" });
  }
};

module.exports = { getAllReviews, approveReviews, unapproveReviews, deleteReviews };


