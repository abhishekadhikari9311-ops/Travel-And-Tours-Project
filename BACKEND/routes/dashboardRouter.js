import express from "express";
import dashboardController from "../controllers/dashboard-controller.js";
import adminMiddleware from "../middlewares/admin-middleware.js";
import { tokenVerify } from "../middlewares/token-verify.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router
  .route("/post-destination-api")
  .post(
    tokenVerify,
    adminMiddleware,
    upload.single("destinationImage"),
    dashboardController.postDestination,
  );

router
  .route("/post-package-api")
  .post(
    tokenVerify,
    adminMiddleware,
    upload.single("destinationImage"),
    dashboardController.postPackage,
  );

router
  .route("/post-category-api")
  .post(tokenVerify, adminMiddleware, dashboardController.postCategory);

router
  .route("/get-category-api")
  .get(tokenVerify, adminMiddleware, dashboardController.getCategory);

router
  .route("/getAllUsers")
  .get(tokenVerify, adminMiddleware, dashboardController.getAllUsers);

router
  .route("/toggle-user-status/:userId")
  .patch(tokenVerify, adminMiddleware, dashboardController.toggleUserStatus);

router
  .route("/delete-user/:userId")
  .delete(tokenVerify, adminMiddleware, dashboardController.deleteUser);

// router
//   .route("/get-destination/:destinationId")
//   .get(dashboardController.getDestinationById);

router
  .route("/edit-destination-api/:destinationId")
  .patch(
    tokenVerify,
    adminMiddleware,
    upload.single("destinationImage"),
    dashboardController.editDestination,
  );

router
  .route("/edit-package-api/:packageId")
  .patch(
    tokenVerify,
    adminMiddleware,
    upload.single("destinationImage"),
    dashboardController.editPackage,
  );

// router
//   .route("/get-package-api/:packageId")
//   .get(tokenVerify, adminMiddleware, dashboardController.getPackageById);

router
  .route("/delete-package-api/:packageId")
  .delete(tokenVerify, adminMiddleware, dashboardController.deletePackage);

router
  .route("/booking-approval-a/:bookingId")
  .patch(tokenVerify, adminMiddleware, dashboardController.bookingApproval_A);

router
  .route("/booking-approval-r/:bookingId")
  .patch(tokenVerify, adminMiddleware, dashboardController.bookingApproval_R);

router
  .route("/delete-booking-by-admin/:bookingId")
  .delete(
    tokenVerify,
    adminMiddleware,
    dashboardController.deleteBookingByAdmin,
  );

router
  .route("/delete-review/:reviewId")
  .delete(tokenVerify, adminMiddleware, dashboardController.deleteReview);

router
  .route("/create-email-setting")
  .post(tokenVerify, adminMiddleware, dashboardController.createEmailSetting);

router
  .route("/update-email-setting/:id")
  .patch(
    tokenVerify,
    adminMiddleware,
    dashboardController.updateEmailSettingById,
  );

router
  .route("/get-email-setting")
  .get(tokenVerify, adminMiddleware, dashboardController.getEmailSetting);

router
  .route("/get-email-setting/:id")
  .get(tokenVerify, adminMiddleware, dashboardController.getEmailSettingById);

router
  .route("/delete-email-setting/:id")
  .delete(
    tokenVerify,
    adminMiddleware,
    dashboardController.deleteEmailSettingById,
  );

router
  .route("/email-controller")
  .post(tokenVerify, adminMiddleware, dashboardController.emailController);

export default router;
