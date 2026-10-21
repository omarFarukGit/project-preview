import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { submissionsController } from "./submissions.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { submissionsValidation } from "./submissions.validation";
import { submissionRateLimiter } from "../../middleware/submissionRateLimiter";

const router = Router();

router.post(
  "/",
  auth(Role.STUDENT),
  submissionRateLimiter,
  validateRequest(submissionsValidation.createSubmissionSchema),
  submissionsController.createsubmissions,
);
router.get(
  "/my-submissions",
  auth(Role.STUDENT),
  submissionsController.getMySubmissions,
);

router.get(
  "/",
  auth(Role.MENTOR, Role.ADMIN),
  validateRequest(submissionsValidation.submissionQuerySchema),
  submissionsController.getAllSubmissions,
);

export const submissionsRoutes = router;
