import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },
    adultCount: {
      type: Number,
      required: true,
    },
    childCount: {
      type: Number,
      required: true,
    },
    checkIn:{
      type:Date,
      required:true,
    },
    checkOut:{
      type:Date,
      required:true,
    },
    totalCost:{
      type:Number,
      required:true,
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking",bookingSchema)