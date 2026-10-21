import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { usersService } from "./user.service";

const me = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const result = await usersService.me(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieval successfully",
    data: result,
  });
});

const promoteToMentor = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await usersService.promoteToMentor(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "promoted to mentor successfully",
    data: result,
  });
});

export const usersController = {
  me,
  promoteToMentor,
};
