import Destination from "../models/destination-model.js";
import Package from "../models/package-model.js";
import Category from "../models/category-model.js";
import User from "../models/user-model.js";
import Booking from "../models/booking-model.js";
import Review from "../models/review-model.js";
import mongoose from "mongoose";
import SettingsEmail from "../models/settings-email-model.js";
import sendEmail from "../misc/sendEmail.js";

const postDestination = async (req, res) => {
  console.log("Inside postDestination controller");
  try {
    const userId = req.user.id;
    console.log("Received userId:", userId);

    const {
      name,
      country,
      description,
      bestTimeToVisit,
      highlights,
      category,
    } = req.body;
    console.log("Received data:", req.body);

    const destinationImagePath = req.file ? req.file.path : null;

    console.log("Received file:", req.file);

    console.log("destinationImage:", destinationImagePath);
    let highlights1 = highlights;
    if (typeof highlights === "string") {
      highlights1 = highlights.split(",").map((item) => item.trim());
    }

    if (
      !name ||
      !country ||
      !description ||
      !bestTimeToVisit ||
      !highlights1 ||
      !destinationImagePath ||
      !category
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({
        message: "Invalid category ID",
      });
    }

    const newDestination = await Destination.create({
      name,
      country,
      description,
      bestTimeToVisit,
      highlights: highlights1,
      destinationImage: destinationImagePath,
      category: new mongoose.Types.ObjectId(category),
      userId: new mongoose.Types.ObjectId(userId),
    });
    res.status(201).json({
      message: "Destination created successfully",
      destination: newDestination,
    });
  } catch (error) {
    console.error("Error creating destination:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to create destination",
      error: error.message,
    });
  }
};

const postPackage = async (req, res) => {
  try {
    const {
      packageName,
      packageTime,
      packagePrice,
      packageDescription,
      packageHighlights,
    } = req.body;

    const destinationImagePath = req.file ? req.file.path : null;

    console.log("Received package data:", req.body);
    console.log("Received package file:", req.file);
    console.log("Package destinationImage:", destinationImagePath);

    if (
      !packageName ||
      !packageTime ||
      !packagePrice ||
      !packageDescription ||
      !packageHighlights ||
      !destinationImagePath
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const newPackage = await Package.create({
      packageName,
      packageTime,
      packagePrice,
      packageDescription,
      packageHighlights,
      destinationImage: destinationImagePath,
    });
    res.status(201).json({
      message: "Package created successfully",
      package: newPackage,
    });
  } catch (error) {
    console.error("Error creating package:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to create package",
      error: error.message,
    });
  }
};

const postCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName) {
      return res
        .status(400)
        .json({ message: "Please provide a category name" });
    }

    const newCategory = await Category.create({ categoryName });
    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error in postCategory:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to create category",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      message: "Users retrieved successfully",
      users: users,
    });
  } catch (error) {
    console.error("Error in getAllUsers:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to get users",
      error: error.message,
    });
  }
};

const toggleUserStatus = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isApproved = !user.isApproved;
    await user.save();

    res.status(200).json({
      message: `User ${user.isApproved ? "Active" : "Blocked"} successfully`,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isApproved: user.isApproved,
      },
    });
  } catch (error) {
    console.error("Error in toggleUserStatus:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to toggle user status",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    console.error("Error in deleteUser:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

const editDestination = async (req, res) => {
  try {
    const destinationId = req.params.destinationId;

    const {
      name,
      country,
      description,
      bestTimeToVisit,
      highlights,
      category,
    } = req.body;

    const destinationImagePath = req.file ? req.file.path : null;
    console.log("destinationImagePath:", destinationImagePath);

    if (
      !name ||
      !country ||
      !description ||
      !bestTimeToVisit ||
      !highlights ||
      !category
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const updatedData = {
      name,
      country,
      description,
      bestTimeToVisit,
      highlights,
      category: new mongoose.Types.ObjectId(category),
    };

    if (req.file) {
      updatedData.destinationImage = req.file.path;
    }

    const updatedDestination = await Destination.findByIdAndUpdate(
      destinationId,
      updatedData,
      { returnDocument: "after" },
    );

    if (!updatedDestination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json({
      message: "Destination updated successfully",
      destination: updatedDestination,
    });
  } catch (error) {
    console.error("Error in editDestination:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to edit destination",
      error: error.message,
    });
  }
};

const editPackage = async (req, res) => {
  try {
    const packageId = req.params.packageId;

    const {
      packageName,
      packageTime,
      packagePrice,
      packageDescription,
      packageHighlights,
    } = req.body;

    if (
      !packageName ||
      !packageTime ||
      !packagePrice ||
      !packageDescription ||
      !packageHighlights
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // const destinationImagePath = req.file ? req.file.path : null;

    const updatedData = {
      packageName,
      packageTime,
      packagePrice,
      packageDescription,
      packageHighlights,
      // destinationImage: destinationImagePath,
    };

    if (req.file) {
      updatedData.destinationImage = req.file.path;
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      packageId,
      updatedData,
      { new: true },
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json({
      message: "Package updated successfully",
      package: updatedPackage,
    });
  } catch (error) {
    console.error("Error in editPackage:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to edit package",
      error: error.message,
    });
  }
};

const deletePackage = async (req, res) => {
  try {
    const packageId = req.params.packageId;
    console.log("Received packageId for deletion:", packageId);

    const deletedPackage = await Package.findByIdAndDelete(packageId);

    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    console.log("Deleted package:", deletedPackage);

    res.status(200).json({
      message: "Package deleted successfully",
      package: deletedPackage,
    });
  } catch (error) {
    console.error("Error in deletePackage:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to delete package",
      error: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      message: "Review deleted successfully by admin",
      review: deletedReview,
    });
  } catch (error) {
    console.error("Error in deleteReview:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to delete review",
      error: error.message,
    });
  }
};

const deleteBookingByAdmin = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!bookingId) {
      return res.status(400).json({ message: "Booking ID is required" });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (user.role === "admin") {
      const deletedBooking = await Booking.findByIdAndDelete(bookingId);

      if (!deletedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      return res.status(200).json({
        message: "Booking deleted successfully by admin",
        booking: deletedBooking,
      });
    }

    if (booking.userId.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this booking" });
    }

    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking deleted successfully by user",
      booking: deletedBooking,
    });
  } catch (error) {
    console.error("Error in deleteBookingByAdmin:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to delete booking",
      error: error.message,
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      message: "Categories retrieved successfully",
      categories: categories,
    });
  } catch (error) {
    console.error("Error in getCategory:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to get category",
      error: error.message,
    });
  }
};

const bookingApproval_A = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        message:
          "Booking decision already made. Cannot modify already approved or rejected bookings",
        booking,
      });
    }

    // atomic operation to find the booking and update its approval status

    const bookingApproval = await Booking.findOneAndUpdate(
      {
        _id: bookingId,
        status: "pending",
      },
      {
        $set: {
          status: "approved",
          isApproved: true,
        },
      },
      { new: true },
    );

    res.status(200).json({
      message: "Booking approved successfully",
      booking: bookingApproval,
    });
  } catch (error) {
    console.error("Error in bookingApproval:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to approve booking",
      error: error.message,
    });
  }
};

const bookingApproval_R = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        message:
          "Booking decision already made. Cannot modify already approved or rejected bookings",
        booking,
      });
    }

    // atomic operation to find the booking and update its approval status

    const bookingApproval = await Booking.findOneAndUpdate(
      {
        _id: bookingId,
        status: "pending",
      },
      {
        $set: {
          status: "rejected",
          isApproved: false,
        },
      },
      { new: true },
    );

    res.status(200).json({
      message: "Booking rejected successfully",
      booking: bookingApproval,
    });
  } catch (error) {
    console.error("Error in bookingApproval:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to reject booking",
      error: error.message,
    });
  }
};

const createEmailSetting = async (req, res) => {
  try {
    const { smtpHost, smtpPort, smtpSecure, smtpUser, smtpPass } = req.body;

    console.log("Received email settings:", req.body);

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Here you would typically save the email settings to your database

    const newEmailSetting = await SettingsEmail.create({
      smtpHost,
      smtpPort,
      smtpSecure,
      auth: {
        smtpUser,
        smtpPass,
      },
    });
    res.status(201).json({
      message: "Email setting created successfully",
      emailSetting: newEmailSetting,
    });
  } catch (error) {
    console.error("Error in createEmailSetting:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to create email setting",
      error: error.message,
    });
  }
};

const updateEmailSettingById = async (req, res) => {
  try {
    const emailSettingId = req.params.id;
    const { smtpHost, smtpPort, smtpSecure, smtpUser, smtpPass } = req.body;

    console.log("Received email settings for update:", req.body);

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Here you would typically update the email settings in your database

    const updatedEmailSetting = await SettingsEmail.findOneAndUpdate(
      { _id: emailSettingId },
      {
        smtpHost,
        smtpPort,
        smtpSecure,
        auth: {
          smtpUser,
          smtpPass,
        },
      },
      { new: true, upsert: true },
    );
    console.log("Updated email setting:", updatedEmailSetting);

    res.status(200).json({
      message: "Email setting updated successfully",
      emailSetting: updatedEmailSetting,
    });
  } catch (error) {
    console.error("Error in updateEmailSetting:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to update email setting",
      error: error.message,
    });
  }
};

const getEmailSetting = async (req, res) => {
  try {
    const emailSetting = await SettingsEmail.find();

    if (!emailSetting) {
      return res.status(404).json({ message: "Email setting not found" });
    }
    res.status(200).json({
      message: "Email setting retrieved successfully",
      emailSetting,
    });
  } catch (error) {
    console.error("Error in getEmailSetting:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to get email setting",
      error: error.message,
    });
  }
};

const deleteEmailSettingById = async (req, res) => {
  try {
    const emailSettingId = req.params.id;

    const deletedEmailSetting = await SettingsEmail.findOneAndDelete({
      _id: emailSettingId,
    });

    if (!deletedEmailSetting) {
      return res.status(404).json({ message: "Email setting not found" });
    }
    res.status(200).json({
      message: "Email setting deleted successfully",
      emailSetting: deletedEmailSetting,
    });
  } catch (error) {
    console.error("Error in deleteEmailSettingById:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to delete email setting",
      error: error.message,
    });
  }
};

const emailController = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    console.log("Received email data:", req.body);

    if (!to || !subject || !text) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const settings = await SettingsEmail.findOne();

    if (!settings) {
      return res.status(404).json({ message: "Email settings not found" });
    }

    // Here you would typically send the email using your configured email service

    await sendEmail({ to, subject, html: text, settings });

    console.log("Email sent successfully to:", to);

    res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error in emailController:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to send email",
      error: error.message,
    });
  }
};

const getEmailSettingById = async (req, res) => {
  try {
    const emailSettingId = req.params.id;

    console.log("Received email setting ID:", emailSettingId);

    if (!mongoose.Types.ObjectId.isValid(emailSettingId)) {
      return res.status(400).json({ message: "Invalid email setting ID" });
    }

    const emailSetting = await SettingsEmail.findById(emailSettingId);

    if (!emailSetting) {
      return res.status(404).json({ message: "Email setting not found" });
    }

    res.status(200).json({
      message: "Email setting retrieved successfully",
      emailSetting,
    });
  } catch (error) {
    console.error("Error in getEmailSettingById:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to get email setting by ID",
      error: error.message,
    });
  }
};

export default {
  postDestination,
  postPackage,
  postCategory,
  // getDestinationById,
  getAllUsers,
  toggleUserStatus,
  deleteUser,
  editDestination,
  // deleteDestination,
  editPackage,
  deletePackage,
  bookingApproval_A,
  bookingApproval_R,
  deleteReview,
  deleteBookingByAdmin,
  getCategory,
  createEmailSetting,
  updateEmailSettingById,
  getEmailSetting,
  deleteEmailSettingById,
  emailController,
  getEmailSettingById,
};
