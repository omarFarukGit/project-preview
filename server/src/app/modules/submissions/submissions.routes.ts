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
  "/stats",
  auth(Role.MENTOR, Role.ADMIN),
  submissionsController.getSubmissionStats,
);

router.get(
  "/my-stats",
  auth(Role.STUDENT),
  submissionsController.getStudentStats,
);

router.get(
  "/",
  auth(Role.MENTOR, Role.ADMIN),
  validateRequest(submissionsValidation.submissionQuerySchema),
  submissionsController.getAllSubmissions,
);
router.get(
  "/:id",
  auth(Role.STUDENT, Role.MENTOR, Role.ADMIN),
  submissionsController.getSubmissionById,
);

router.patch(
  "/:id/review",
  auth(Role.MENTOR, Role.ADMIN),
  validateRequest(submissionsValidation.reviewSubmissionSchema),
  submissionsController.reviewSubmission,
);

export const submissionsRoutes = router;
