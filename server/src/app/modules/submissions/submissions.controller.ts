import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { submissionsService } from "./submissions.service";
import httpStatus from "http-status";
import { Role } from "../../../generated/prisma/enums";

const createsubmissions = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.user?.userId as string;
  const result = await submissionsService.createSubmissions(
    studentId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Project submitted successfully",
    data: result,
  });
});

const getMySubmissions = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.user?.userId as string;
  const result = await submissionsService.getMySubmissions(
    studentId,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your submissions retrieved successfully",
    data: result,
  });
});

const getAllSubmissions = catchAsync(async (req: Request, res: Response) => {
  const result = await submissionsService.getAllSubmissions(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Submissions retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSubmissionById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const userId = req.user?.userId as string;
  const role = req.user?.role as Role;
  const result = await submissionsService.getSubmissionById(id, userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Submission retrieved successfully",
    data: result,
  });
});

const reviewSubmission = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const userId = req.user?.userId as string;
  const result = await submissionsService.reviewSubmission(
    id,
    userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Submission reviewed successfully",
    data: result,
  });
});

const getSubmissionStats = catchAsync(async (_req: Request, res: Response) => {
  const result = await submissionsService.getSubmissionStats();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Submission statistics retrieved successfully",
    data: result,
  });
});

const getStudentStats = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const result = await submissionsService.getStudentStats(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student statistics retrieved successfully",
    data: result,
  });
});

export const submissionsController = {
  createsubmissions,
  getMySubmissions,
  getAllSubmissions,
  getSubmissionById,
  getSubmissionStats,
  reviewSubmission,
  getStudentStats,
};
