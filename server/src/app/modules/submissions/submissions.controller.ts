import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { submissionsService } from "./submissions.service";
import httpStatus from "http-status";

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
  const result = await submissionsService.getMySubmissions(studentId);

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

export const submissionsController = {
  createsubmissions,
  getMySubmissions,
  getAllSubmissions,
};
