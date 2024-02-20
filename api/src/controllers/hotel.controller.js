import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Hotel } from "../models/hotel.model.js";

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
export {getAllHotels}