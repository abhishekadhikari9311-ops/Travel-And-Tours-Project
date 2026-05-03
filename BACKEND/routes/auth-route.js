import express from "express";
import authController from "../controllers/auth-controller.js";
import verifyEmail from "../misc/verify-email.js";
import { tokenVerify } from "../middlewares/token-verify.js";
import { optionalAuth } from "../middlewares/optionalAuth.js";

const router = express.Router();

router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.loginUser);
router.route("/verify-email/:token").get(verifyEmail);
router.route("/reset-password").post(authController.requestPasswordReset);
router.route("/reset-password/:token").post(authController.resetPassword);

router.route("/profile").get(tokenVerify, authController.getUserProfile);
router.route("/post-contact").post(authController.postContact);

router
  .route("/change-password")
  .post(tokenVerify, authController.changePassword);

router
  .route("/update-profile")
  .patch(tokenVerify, authController.updateProfile);

router
  .route("/booking-add/:packageId")
  .post(tokenVerify, authController.addBooking);

router
  .route("/post-review/:destinationId")
  .post(tokenVerify, authController.postReview);

router.route("/get-review").get(tokenVerify, authController.getReviews);

router
  .route("/delete-destination/:id")
  .delete(tokenVerify, authController.deleteDestination);

router
  .route("/get-booking/:packageId")
  .get(tokenVerify, authController.getBookingByPackageId);

router.route("/get-bookings").get(tokenVerify, authController.getBookings);

router
  .route("/delete-booking/:bookingId")
  .delete(tokenVerify, authController.deleteBooking);

router
  .route("/get-destination/:destinationId")
  .get(tokenVerify, authController.getDestinationById);

router
  .route("/get-destinations")
  .get(tokenVerify, authController.getDestinations);

router
  .route("/get-packages/:packageId")
  .get(tokenVerify, authController.getPackageById);

router
  .route("/like-destination/:destinationId")
  .patch(tokenVerify, authController.likeDestination);

router.route("/get-packages").get(optionalAuth, authController.getPackages);

export default router;
