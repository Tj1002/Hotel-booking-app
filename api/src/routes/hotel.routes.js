import express from "express";
import {getAllHotels, getHotel } from "../controllers/hotel.controller.js";


const router = express.Router();

router.route("/").get(getAllHotels);
router.route("/:id").get(getHotel);

export default router;
