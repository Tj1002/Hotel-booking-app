import express from "express";
import {getAllHotels, getHotel, paymentIntent } from "../controllers/hotel.controller.js";
import { verifyJWT } from "../middlewares/user.middleware.js";


const router = express.Router();

router.route("/").get(getAllHotels);
router.route("/:id").get(getHotel);
router.route('/:hotelId/bookings/create-payment-intent').post(verifyJWT,paymentIntent)

export default router;
