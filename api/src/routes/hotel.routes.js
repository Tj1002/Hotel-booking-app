import express from "express";
import {getAllHotels, getHotel, searchHotels} from "../controllers/hotel.controller.js";


const router = express.Router();

router.route("/search").get(searchHotels);
router.route("/").get(getAllHotels);
router.route("/:id").get(getHotel);

export default router;
