import { Router } from "express";
import { authControllers } from "./auth.controller";
import { validateRequest } from "../middleware/validateRequest";
import { UserValidation } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(UserValidation.UserRegistrationZodSchema),
  authControllers.register,
);

export const authRoutes = router;
