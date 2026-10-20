import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { userService } from "./user.service";

const me = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const result = await userService.me(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieval successfully",
    data: result,
  });
});

export const userController = {
  me,
};
