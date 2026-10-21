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
// Admin only
router.get("/", auth(Role.ADMIN), usersController.getAllUsers);

router.patch("/:id/block", auth(Role.ADMIN), usersController.blockUser);

router.patch("/:id/suspend", auth(Role.ADMIN), usersController.suspendUser);

router.delete("/:id", auth(Role.ADMIN), usersController.deleteUser);

router.patch(
  "/:id/promote-to-mentor",
  auth(Role.ADMIN),
  usersController.promoteToMentor,
);
export const userRoutes = router;
