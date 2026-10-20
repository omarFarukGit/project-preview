import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";
import { authServices } from "./auth.service";
import { sendResponse } from "../utils/sendResponse";

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.register(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "registration successfully ",
    data: result,
  });
});

export const authControllers = {
  register,
};
