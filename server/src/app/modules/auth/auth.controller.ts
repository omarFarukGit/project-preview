import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import config from "../../config";

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.register(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "registration successfully ",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken, user } = await authServices.login(
    req.body,
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.node_env !== "development",
    sameSite: config.node_env === "development" ? "lax" : "none",
    maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env !== "development",
    sameSite: config.node_env === "development" ? "lax" : "none",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successfully",
    data: {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken
    ? req.cookies.refreshToken
    : req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization?.split(" ")[1]
      : req.headers.authorization;
  const { accessToken, refreshToken } = await authServices.refreshToken(
    token as string,
  );
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.node_env !== "development",
    sameSite: config.node_env === "development" ? "lax" : "none",
    maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env !== "development",
    sameSite: config.node_env === "development" ? "lax" : "none",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refresh token successful",
    data: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  });
});

export const authControllers = {
  register,
  login,
  refreshToken,
};
