import { Hotel } from "./../models/hotel.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const registerHotel = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
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
  if (facilities.length == 0) {
    throw new ApiError(400, "Atleast enter one facility");
  }

  if (
    [
      name,
      city,
      country,
      description,
      type,
      adultCount,
      childCount,
      pricePerNight,
      starRating,
    ].some((field) => (field || "").trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const imageLocalfiles = req.files;
  console.log("files", imageLocalfiles);
  if (!imageLocalfiles) {
    throw new ApiError(400, "No imageLocalFile available");
  }
  const localFilePaths =
    imageLocalfiles && imageLocalfiles.map((file) => file.path);
  console.log("localFilePaths", localFilePaths);
  if (!localFilePaths) {
    throw new ApiError(400, "No localFilePath available");
  }
  const imageUrl = await uploadOnCloudinary(localFilePaths);
  console.log("imageurl", imageUrl);
  if (!imageUrl) {
    throw new ApiError(400, "No imageurl available");
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
    imageUrls: imageUrl && imageUrl.map((imUrl) => imUrl.url),
    lastUpdated: new Date(),
  });

  if (!hotel) {
    throw new ApiError(500, "Something went wrong while registering the hotel");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, hotel, "Hotel registered Successfully"));
});
const getAllHotels = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(400, "You are not authroized to view this");
  }
  const hotels = await Hotel.find({ userId });
  if (!hotels) {
    throw new ApiError(400, "No hotels found");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, hotels, "fetching all hotels Successfully"));
});
const getSingleHotel = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(400, "You are not authroized to view this");
  }

  const hotel = await Hotel.findById({ _id: req.params.id });
  if (!hotel) {
    throw new ApiError(400, "No hotels found");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, hotel, "fetching hotel Successfully"));
});
const updateHotel = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(400, "You are not authroized to view this");
  }
  const id = req.params.id;
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
    [
      name,
      city,
      country,
      description,
      type,
      adultCount,
      childCount,
      pricePerNight,
      starRating,
    ].some((field) => (field || "").trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  if (facilities.length == 0) {
    throw new ApiError(400, "Atleast enter one facility");
  }
  const files = req.files;
  console.log("files", files);
  const imageUrlLocalPath = files && files.map((file) => file.path);
  console.log("imageurllocalpath", imageUrlLocalPath);
  const updatedImageUrls = await uploadOnCloudinary(imageUrlLocalPath);

  const allImageUrls = [...updatedImageUrls, ...(req.body.imageUrls || 0)];
  if (allImageUrls.length > 6) {
    throw new ApiError(400, "maximum 6 images are allowed");
  }
  const updatedHotel = await Hotel.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
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
        imageUrls: allImageUrls && allImageUrls.map((imageUrl) => imageUrl.url),
        lastUpdated: new Date(),
      },
    },
    {
      new: true,
    }
  );
  if (!updatedHotel) {
    throw new ApiError(500, "Error while updating hotels");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, updatedHotel, "hotel updating Successfully"));
});
const deleteHotel = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(400, "You are not authroized to view this");
  }
  const id = req.params.id;
  await Hotel.findByIdAndDelete({
    _id: id,
  });
  return res
    .status(201)
    .json(new ApiResponse(200, "fetching Deleted Successfully"));
});
export {
  registerHotel,
  getAllHotels,
  getSingleHotel,
  updateHotel,
  deleteHotel,
};
