import express from "express";
import {getAllHotels } from "../controllers/hotel.controller.js";

const router = express.Router();

router.route("/").get(getAllHotels);

export default router;
