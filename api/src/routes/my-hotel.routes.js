import express from "express";
import { verifyJWT } from "../middlewares/user.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getAllHotels, registerHotel } from "../controllers/my-hotel.controller.js";
const router = express.Router();
router.route("/register").post(verifyJWT,upload.array("imageFiles",6),registerHotel);
router.route('/getAllHotels').get(verifyJWT,getAllHotels)
export default router