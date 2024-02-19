import express from "express";
import { verifyJWT } from "../middlewares/user.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { registerHotel } from "../controllers/my-hotel.controller.js";
const router = express.Router();
router.route("/register").post(verifyJWT,upload.array("imageFiles",6),registerHotel);
export default router