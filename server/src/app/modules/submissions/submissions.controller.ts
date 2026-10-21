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

export const submissionsContorler = {
  createsubmissions,
};
