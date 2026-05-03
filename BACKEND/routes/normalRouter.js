import express from "express";

import normalController from "../controllers/normal-controller.js";
import { tokenVerify } from "../middlewares/token-verify.js";
import { optionalAuth } from "../middlewares/optionalAuth.js";

const router = express.Router();

// router.route("/get-destinations").get(normalController.getDestination);
router.get("/get-destinations", optionalAuth, normalController.getDestination);
router.route("/get-packages").get(optionalAuth, normalController.getPackage);

export default router;
