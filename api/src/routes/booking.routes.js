import express from "express";
import { booking, getBookings, payment } from "../controllers/booking.controller.js";
import { verifyJWT } from "../middlewares/user.middleware.js";

const router = express.Router();

router
  .route("/:hotelId/bookings/create-payment-intent")
  .post(verifyJWT, payment);
router.route("/:hotelId/bookings").post(verifyJWT, booking);
router.route('/').get(verifyJWT,getBookings)


export default router;
