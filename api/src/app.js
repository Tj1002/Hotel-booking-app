import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"

const app = express()
app.use(morgan('tiny'))
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
//importing router
import userRouter from "./routes/user.routes.js"
import myHotelRouter from "./routes/my-hotel.routes.js"
import hotelRouter from "./routes/hotel.routes.js"
import bookingRouter from "./routes/booking.routes.js"

app.use('/api/v1/users',userRouter)
app.use('/api/v1/my-hotels',myHotelRouter)
app.use('/api/v1/hotels',hotelRouter)
app.use('/api/v1/bookings',bookingRouter)

export default app