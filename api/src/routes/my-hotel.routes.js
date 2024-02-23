import express from "express";
import { verifyJWT } from "../middlewares/user.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteHotel, getAllHotels, getSingleHotel, registerHotel, updateHotel } from "../controllers/my-hotel.controller.js";
const router = express.Router();
router.route('/register').post(verifyJWT,upload.array('imageFiles',6),registerHotel)
router.route('/getAllHotels').get(verifyJWT,getAllHotels)
router.route('/getSingleHotel/:id').get(verifyJWT,getSingleHotel)
router
  .route("/updateHotel/:id")
  .put(verifyJWT, upload.array("imageFiles"), updateHotel);

router.route("/deleteHotel/:id").delete(verifyJWT, deleteHotel);

export default router