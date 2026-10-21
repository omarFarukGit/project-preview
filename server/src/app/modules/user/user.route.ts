import { Router } from "express";
import { usersController } from "./user.controller";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get(
  "/me",
  auth(Role.ADMIN, Role.MENTOR, Role.STUDENT),
  usersController.me,
);
router.patch(
  "/:id/promote-to-mentor",
  auth(Role.ADMIN),
  usersController.promoteToMentor,
);
export const userRoutes = router;
