import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Stripe from "stripe";
import { Hotel } from "../models/hotel.model.js";

const stripe = new Stripe(process.env.STRIPE_API_KEY);

const payment = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(400, "All fields are required");
  }
  const { numberOfNights } = req.body;
  const hotelId = req.params.hotelId;
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    throw new ApiError(400, "No hotel matches with thi id");
  }
  const totalCost = numberOfNights * hotel.pricePerNight;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost,
    currency: "inr",
    metadata: {
      hotelId,
      userId: req.user._id,
    },
  });
  if (!paymentIntent.client_secret) {
    throw new ApiError(400, "Something wrong in creating payment");
  }
  const response = {
    paymentIntentId: paymentIntent.id,
    clientSecret: payment.client_secret.toString(),
    totalCost,
  };
  return res
    .status(201)
    .json(new ApiResponse(200,  response , "payment successful"));
});

const booking =asyncHandler(async(req,res)=>{
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(400, "All fields are required");
  }
  const paymentIntentId = req.body.paymentIntentId;

  const paymentIntent = await stripe.paymentIntents.retrieve(
    paymentIntentId
  );

  if (!paymentIntent) {
     throw new ApiError(400, "payment intent not found");
  }

  if (
    paymentIntent.metadata.hotelId !== req.params.hotelId ||
    paymentIntent.metadata.userId !== req.userId
  ) {
     throw new ApiError(400, "payment intent mismatch");
  }

  if (paymentIntent.status !== "succeeded") {
     throw new ApiError(400, `payment intent not succeeded. Status: ${paymentIntent.status}`);
  }

  const newBooking= {
    ...req.body,
    userId: req.userId,
  };

  const hotel = await Hotel.findOneAndUpdate(
    { 
      _id: req.params.hotelId
     },
    {
      $push: { bookings: newBooking },
    }
  );

  if (!hotel) {
         throw new ApiError(400, "hotel not found");
  }
  await hotel.save();
  return res
    .status(201)
    .json(new ApiResponse(200, hotel , "payment successful"));
})

const getBookings = asyncHandler(async(req,res)=>{
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(400, "All fields are required");
  }
  const hotels= await Hotel.find({
    bookings:{
      $eleMatch:{
        userId
    }}
  })
  const result = hotels.map(hotel=>{
    const userBookings= hotel.bookings.filter(booking=>booking.userId===req.userId)
    const hotelWithUserBookings={
      ...hotel.toObject(),
      bookings:userBookings
    }
    return hotelWithUserBookings
  })
  return res
    .status(201)
    .json(new ApiResponse(200, result, "hotel bookings"));

})
export { booking, payment,getBookings };