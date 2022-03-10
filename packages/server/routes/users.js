import express from "express";
import { auth, register } from "../controllers/user";
import { authValidation, registerValidation } from "../validators/validator";

const router = express.Router();

router.post("/auth", authValidation, auth);
router.post("/register", registerValidation, register);

export const userRoutes = router;
