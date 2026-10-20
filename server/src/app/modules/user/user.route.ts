import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get(
  "/me",
  auth(Role.ADMIN, Role.MENTOR, Role.STUDENT),
  userController.me,
);

export const userRoutes = router;
