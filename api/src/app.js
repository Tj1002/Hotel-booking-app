import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));

const app = express();
app.use(morgan("tiny"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());
//importing router
import userRouter from "./routes/user.routes.js";
import myHotelRouter from "./routes/my-hotel.routes.js";
import hotelRouter from "./routes/hotel.routes.js";
import bookingRouter from "./routes/booking.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/my-hotels", myHotelRouter);
app.use("/api/v1/hotels", hotelRouter);
app.use("/api/v1/bookings", bookingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

export default app;
