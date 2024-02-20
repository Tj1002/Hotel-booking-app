import express from "express"
import { loginUser, logoutUser, me, registerUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/user.middleware.js"
const router=express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJWT,logoutUser)
router.route('/me').get(verifyJWT,me)
export default router