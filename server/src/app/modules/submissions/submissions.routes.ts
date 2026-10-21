import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { submissionsContorler } from "./submissions.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { submissionsValidation } from "./submissions.validation";
import { submissionRateLimiter } from "../../middleware/submissionRateLimiter";

const router = Router();

router.post(
  "/",
  auth(Role.STUDENT),
  submissionRateLimiter,
  validateRequest(submissionsValidation.createSubmissionSchema),
  submissionsContorler.createsubmissions,
);

export const submissionsRoutes = router;
