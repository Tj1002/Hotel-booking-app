import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asynchandler.js"
import { ApiError } from "../utils/ApiError.js"


const registerUser = asyncHandler( async (req, res) => {
    

    const {firstName, lastName,email,  password } = req.body

    if (
        [firstName,lastName, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({email})

    if (existedUser) {
        throw new ApiError(409, "User with email already exists")
    }
    const user = await User.create({
      firstName,
      lastName,
       
        email, 
        password,
        
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )





} )
export {registerUser}