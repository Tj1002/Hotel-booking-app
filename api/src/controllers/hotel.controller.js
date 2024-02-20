import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Hotel } from "../models/hotel.model.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_API_KEY);
const getAllHotels = asyncHandler(async(req,res)=>{
  
  const pageSize=5;
  const pageNumber= parseInt(req.query.page ? req.query.page.toString() : "1")
  const skip = (pageNumber-1)*pageSize;

  const hotels = await Hotel.find().skip(skip).limit(pageSize)
  const total = await Hotel.countDocuments()
  const response = {
    data:hotels,
    pagination:{
       total,
       page:pageNumber,
       pages:Math.ceil(total/pageSize)
    }
  }
  return res
    .status(201)
    .json(new ApiResponse(200,{response} ,"getting all hotels"));
})
const getHotel = asyncHandler(async(req,res)=>{
  const id = req.params.id;
  const hotel = await Hotel.findById({
    _id:id
  })
  if(!hotel){
    throw new ApiError(400, "No hotel matches with thi id");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, { hotel }, "getting particular hotel"));
})
const paymentIntent= asyncHandler(async(req,res)=>{
  const {numberOfNights}=req.body
  const hotelId=req.params.hotelId
  const hotel = await Hotel.findById(hotelId)
  if(!hotel){
    throw new ApiError(400, "No hotel matches with thi id");
  }
  const totalCost = numberOfNights*hotel.pricePerNight
  const payment = await stripe.paymentIntents.create({
    amount:totalCost,
    currency:"inr",
    metadata:{
      hotelId,
      userId:req.user._id,
    }
  })
  if(!payment.client_secret){
    throw new ApiError(400, "Something wrong in creating payment");
  }
  const response = {
    paymentId:payment.id,
    clientSecret:payment.client_secret.toString(),
    totalCost,
  }
   return res
    .status(201)
    .json(new ApiResponse(200, { response }, "payment successful"));

})
export {getAllHotels,getHotel,paymentIntent}