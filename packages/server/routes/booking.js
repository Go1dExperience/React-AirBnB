import express from "express";
const router = express.Router();
import { createBooking, getUserBookings } from "../controllers";
import { authMiddleware } from "../controllers/user";

router.post("", authMiddleware, createBooking);

router.get("/manage", authMiddleware, getUserBookings);

export const bookingRoutes = router;
