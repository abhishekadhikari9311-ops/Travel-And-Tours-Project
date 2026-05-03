import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import {
  generateJwtToken,
  generateRandomToken,
} from "../services/auth-services.js";
import emailVerification from "../misc/email-verify-link.js";
import sendEmail from "../misc/sendEmail.js";
import Contact from "../models/contact-model.js";
import Booking from "../models/booking-model.js";
import Review from "../models/review-model.js";
import Destination from "../models/destination-model.js";
import Package from "../models/package-model.js";
import mongoose from "mongoose";
import SettingsEmail from "../models/settings-email-model.js";

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      // role: "user",
      // isApproved: false,
    });

    console.log("New User Created:", newUser);

    const settings = await SettingsEmail.findOne();
    console.log("Email settings found:", settings);

    if (!settings) {
      return res.status(404).json({ message: "Email settings not found" });
    }

    await emailVerification(newUser, settings);

    const jwtToken = await generateJwtToken({
      id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: "user",
      isApproved: false,
      isEmailVerified: newUser.isEmailVerified,
    });
    console.log("Generated JWT Token:", jwtToken);

    return res.status(201).json({
      message: "User registered successfully",
      token: jwtToken,
      user: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("User Found for Login:", user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = await generateJwtToken({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      isApproved: user.isApproved,
      isEmailVerified: user.isEmailVerified,
    });
    console.log("Generated JWT Token on Login:", token);

    return res
      .status(200)
      .json({ message: "Login successful", user: user, token: token });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please provide your email" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist" });
    }

    const settings = await SettingsEmail.findOne();
    if (!settings) {
      return res.status(404).json({ message: "Email settings not found" });
    }

    console.log("Email settings found:", settings);

    const resetToken = await generateRandomToken();
    console.log("Generated Password Reset Token:", resetToken);

    const resetTokenExpires = Date.now() + 3600000; // 1 hour
    user.passwordResetToken = resetToken;
    user.passwordResetTokenExpires = resetTokenExpires;
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    console.log("Password Reset Link:", resetLink);

    const html = `
      <h1>Password Reset Request</h1>
      <p>Please click the following link to reset your password:</p>
      <a href="${resetLink}" target="_blank">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
    `;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html,
      settings,
    });

    return res
      .status(200)
      .json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;

    const { newPassword, confirmNewPassword } = req.body;

    if (!newPassword || !confirmNewPassword) {
      return res.status(400).json({
        message: "Please provide both new password and confirm password",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const email = req.user.email;
    console.log("Fetching profile for user:", email);

    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User Profile Found:", user);

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const postContact = async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;
    if (!fullName || !email || !subject || !message) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const newInquiry = await Contact.create({
      fullName,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      message: "Contact inquiry submitted successfully",
      inquiry: newInquiry,
    });
  } catch (error) {
    console.error("Error posting contact:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const addBooking = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Please login first" });
    }

    const packageId = req.params.packageId;
    const userId = req.user.id;

    if (!packageId) {
      return res.status(400).json({ message: "Package ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "user") {
      return res
        .status(403)
        .json({ message: "Unauthorized to book this package" });
    }

    // Create a new booking
    const newBooking = await Booking.create({
      packageId,
      userId: new mongoose.Types.ObjectId(userId),
    });

    return res.status(201).json({
      message: "Booking added successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error in addBooking:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to add booking",
      error: error.message,
    });
  }
};

const postReview = async (req, res) => {
  try {
    const destinationId = req.params.destinationId;
    if (!destinationId) {
      return res.status(400).json({ message: "Destination ID is required" });
    }

    const { reviewText, rating } = req.body;

    if (!reviewText || !rating) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newReview = await Review.create({
      reviewText,
      rating,
      userId: new mongoose.Types.ObjectId(user._id),
      destinationId: new mongoose.Types.ObjectId(destinationId),
    });

    return res.status(201).json({
      message: "Review posted successfully",
      review: newReview,
    });
  } catch (error) {
    console.error("Error in postReview:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to post review",
      error: error.message,
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User role in getReviews:", user);

    if (user.role === "user") {
      const reviews = await Review.find({
        userId: user._id,
      }).populate("destinationId", "name");

      return res.status(200).json({
        message: "Reviews retrieved successfully by user",
        reviews,
      });
    }

    const reviews = await Review.find().populate("destinationId", "name");

    return res.status(200).json({
      message: "All reviews retrieved successfully by admin",
      reviews,
    });
  } catch (error) {
    console.error("Error in getReviews:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to get reviews",
      error: error.message,
    });
  }
};

const deleteDestination = async (req, res) => {
  try {
    const destinationId = req.params.id;
    if (!destinationId) {
      return res.status(400).json({ message: "Destination ID is required" });
    }

    const destination = await Destination.findById(destinationId);

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    if (req.user.role !== "user") {
      await destination.deleteOne();
      return res.status(200).json({
        message: "Destination deleted successfully by admin",
        destination,
      });
    }

    const likedDestination = destination.likes.includes(req.user.id);

    if (!likedDestination) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this destination" });
    }

    //  remove the destination from the user's liked destinations

    const updatedDestination = await destination.updateOne({
      $pull: { likes: req.user.id },
    });

    return res.status(200).json({
      message: "Destination deleted successfully by user",
      destination: updatedDestination,
    });
  } catch (error) {
    console.error("Error in deleteDestination:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to delete destination",
      error: error.message,
    });
  }
};

const getBookingByPackageId = async (req, res) => {
  try {
    const packageId = req.params.packageId;
    const userEmail = req.user.email;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!packageId) {
      return res.status(400).json({ message: "Package ID is required" });
    }

    if (user.role === "user") {
      const bookings = await Booking.find({
        userId: user._id,
        packageId: packageId,
      })
        .populate("userId", "fullName")
        .populate("packageId", "packageName packagePrice");
      console.log("Bookings found:", bookings);

      if (!bookings || bookings.length === 0) {
        return res.status(404).json({ message: "Booking not found" });
      }

      return res.status(200).json({
        message: "Booking retrieved successfully by user",
        bookings: bookings,
      });
    }

    const bookings = await Booking.find()
      .populate("userId", "fullName")
      .populate("packageId", "packageName packagePrice");

    if (!bookings) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json({
      message: "Bookings retrieved successfully by admin",
      bookings: bookings,
    });
  } catch (error) {
    console.error("Error in getBookingByPackageId:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to get booking",
      error: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "New passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error in changePassword:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to change password",
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    console.log("Update Profile Request Body:", req.user);

    const userEmail = req.user.email;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { fullName, email, password } = req.body;

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.password = hashedPassword || user.password;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error in updateProfile:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

const getDestinationById = async (req, res) => {
  try {
    const destinationId = req.params.destinationId;
    console.log("Destination ID from request params:", destinationId);

    const destinationData = await Destination.findById(destinationId);
    console.log("Destination found:", destinationData);

    if (!destinationData) {
      return res.status(404).json({ message: "Destination not found" });
    }

    console.log("req.user:", req.user);
    console.log("User ID from token:", req.user.id);

    if (req.user.role === "admin") {
      return res.status(200).json({
        message: "Destination retrieved successfully by admin",
        destination: destinationData,
      });
    }

    console.log("Destination userId:", destinationData.userId);

    if (destinationData.likes.includes(req.user.id)) {
      return res.status(200).json({
        message: "Destination retrieved successfully by user",
        destination: destinationData,
        liked: true,
      });
    } else {
      return res.status(200).json({
        message: "Unauthorized to access this destination",
        liked: false,
      });
    }
  } catch (error) {
    console.error("Error in getDestinationById:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to get destination by ID",
      error: error.message,
    });
  }
};

const likeDestination = async (req, res) => {
  try {
    const destinationId = req.params.destinationId;
    console.log("Destination ID from request params:", destinationId);

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    console.log("Current isLiked value:", destination);

    const userId = req.user.id;
    console.log("User ID from token:", userId);

    // check if the user has already liked the destination

    const alreadyLiked = destination.likes.includes(userId);

    console.log("Already liked:", alreadyLiked);

    if (alreadyLiked) {
      const updatedDestination = await Destination.findByIdAndUpdate(
        destinationId,
        { $pull: { likes: userId } },
        { new: true },
      );

      if (!updatedDestination) {
        return res.status(404).json({ message: "Destination not found" });
      }

      return res.status(200).json({
        message: "Destination unliked successfully",
        destination: updatedDestination,
        action: "unliked",
        likesCount: updatedDestination.likes.length,
        liked: false,
      });
    }

    if (!alreadyLiked) {
      // destination.likes.push(userId);
      const updatedDestination = await Destination.findByIdAndUpdate(
        destinationId,
        { $push: { likes: userId } },
        { new: true },
      );
      if (!updatedDestination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      return res.status(200).json({
        message: "Destination liked successfully",
        destination: updatedDestination,
        action: "liked",
        likesCount: updatedDestination.likes.length,
        liked: true,
      });
    }
  } catch (error) {
    console.error("Error in likeDestination:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to like/unlike destination",
      error: error.message,
    });
  }
};

const getDestinations = async (req, res) => {
  try {
    const userId = req.user.id;

    const destinations = await Destination.find().populate(
      "category",
      "categoryName",
    );
    console.log("Destinations found:", destinations);

    if (req.user.role === "user") {
      const likedDestinations = destinations.filter((destination) =>
        destination.likes.some((id) => id.toString() === userId.toString()),
      );
      console.log("Liked Destinations:", likedDestinations);

      if (likedDestinations.length > 0) {
        return res.status(200).json({
          message: "Liked Destinations retrieved successfully by user",
          destinations: likedDestinations,
        });
      } else {
        return res.status(200).json({
          message: "No liked destinations found",
          destinations: [],
        });
      }
    }

    return res.status(200).json({
      message: "All Destinations retrieved successfully by admin",
      destinations,
    });
  } catch (error) {
    console.error("Error in getDestinations:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to get destinations",
      error: error.message,
    });
  }
};

const getPackageById = async (req, res) => {
  try {
    if (req.user.role === "user") {
      return res
        .status(403)
        .json({ message: "Unauthorized to access this resource" });
    }

    const packageId = req.params.packageId;
    console.log("Received packageId:", packageId);

    const pkg = await Package.findById(packageId);

    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    console.log("Retrieved package:", pkg);

    res.status(200).json({
      message: "Package retrieved successfully by an admin",
      package: pkg,
    });
  } catch (error) {
    console.error("Error in getPackageById:", error.message);
    console.error("Stack trace:", error.stack);
  }
};

const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    console.log("Retrieved packages:", packages);
    res.status(200).json({
      message: "Packages retrieved successfully by an admin or a user",
      packages,
    });
  } catch (error) {
    console.error("Error in getPackages:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to get packages",
      error: error.message,
    });
  }
};

const deleteBooking = async (req, res) => {
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

    if (user.role === "user") {
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      if (booking.userId.toString() !== user._id.toString()) {
        return res
          .status(403)
          .json({ message: "Unauthorized to delete this booking" });
      }

      await booking.deleteOne();

      return res.status(200).json({
        message: "Booking deleted successfully by user",
      });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    await booking.deleteOne();

    return res.status(200).json({
      message: "Booking deleted successfully by admin",
    });
  } catch (error) {
    console.error("Error in deleteBooking:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to delete booking",
      error: error.message,
    });
  }
};

const getBookings = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    if (req.user.role === "user") {
      const userId = req.user.id;
      console.log("User ID from token in getBookings:", userId);
      const bookings = await Booking.find({
        userId: new mongoose.Types.ObjectId(userId),
      })
        .populate("packageId", "packageName packagePrice destinationImage")
        .populate("userId", "fullName email");
      console.log("Bookings found for user:", bookings);
      return res.status(200).json({
        message: "Bookings retrieved successfully by user",
        bookings,
      });
    }
    const bookings = await Booking.find()
      .populate("packageId", "packageName packagePrice destinationImage")
      .populate("userId", "fullName email");
    console.log("All bookings found for admin:", bookings);
    return res.status(200).json({
      message: "Bookings retrieved successfully by admin",
      bookings,
    });
  } catch (error) {
    console.error("Error in getBookings:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Failed to get bookings",
      error: error.message,
    });
  }
};

export default {
  registerUser,
  loginUser,
  requestPasswordReset,
  resetPassword,
  getUserProfile,
  postContact,
  addBooking,
  postReview,
  getReviews,
  deleteDestination,
  getBookingByPackageId,
  changePassword,
  updateProfile,
  getDestinationById,
  likeDestination,
  getDestinations,
  getPackageById,
  getPackages,
  deleteBooking,
  getBookings,
};
