import { Router } from "express";
import { usersController } from "./user.controller";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { upload } from "../../lib/multer";

const router = Router();

router.get(
  "/me",
  auth(Role.ADMIN, Role.MENTOR, Role.STUDENT),
  usersController.me,
);

router.patch(
  "/me/image",
  upload.single("image"),
  auth(Role.ADMIN, Role.STUDENT, Role.MENTOR),
  usersController.updateProfileImage,
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
