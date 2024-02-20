import {Hotel} from "./../models/hotel.model.js"
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const registerHotel = asyncHandler(async (req, res) => {
  const userId=req.user?._id;
  if(!userId){
    throw new ApiError(400, "All fields are required");
  }
  const {
    name,
    city,
    country,
    description,
    type,
    adultCount,
    childCount,
    facilities,
    pricePerNight,
    starRating,
  } = req.body;
  
  if (
    [name,city,country,description,type,adultCount,childCount,facilities,pricePerNight,starRating].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const files = req.files
  console.log("files",files);
  const imageUrlLocalPath=files && files.map(file=>file.path)
  console.log("imageurllocalpath", imageUrlLocalPath);
  if(!imageUrlLocalPath){
    throw new ApiError(400, "imageUrlLocalPath not found");
  }
  const imageUrls = await uploadOnCloudinary(imageUrlLocalPath);
  
  if (!imageUrls) {
    throw new ApiError(400, "image file is required");
  }

  const hotel = await Hotel.create({
    userId,
    name,
    city,
    country,
    description,
    type,
    adultCount,
    childCount,
    facilities,
    pricePerNight,
    starRating,
    imageUrls:imageUrls && imageUrls.map(imageUrl=>imageUrl.url),
    lastUpdated:new Date()
  });

  if (!hotel) {
    throw new ApiError(500, "Something went wrong while registering the hotel");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, hotel, "Hotel registered Successfully"));
});
const getAllHotels=asyncHandler(async(req,res)=>{
  const userId = req.user._id
  if(!userId){
    throw new ApiError(400, "You are not authroized to view this");
  }
  const hotels = await Hotel.find({userId})
  if(!hotels){
    throw new ApiError(400, "No hotels found");
  }
   return res
     .status(201)
     .json(new ApiResponse(200, hotels, "fetching all hotels Successfully"));
})
const getSingleHotel=asyncHandler(async(req,res)=>{
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(400, "You are not authroized to view this");
  }

  const hotel = await Hotel.findById({ _id:req.params.id });
  if (!hotel) {
    throw new ApiError(400, "No hotels found");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, hotel, "fetching hotel Successfully"));
})
export {registerHotel,getAllHotels,getSingleHotel}