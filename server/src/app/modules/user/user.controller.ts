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
const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;

  const result = await usersService.updateMyProfile(userId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile updated successfully",
    data: result,
  });
});

const updateProfileImage = catchAsync(async (req, res) => {
  const userId = req?.user?.userId as string;

  const result = await usersService.updateProfileImage(
    userId,
    req.file?.buffer as Buffer,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile image updated successfully",
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

const getAllUsers = catchAsync(async (req, res) => {
  const result = await usersService.getAllUsers(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const blockUser = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const userId = req.user?.userId as string;
  const result = await usersService.blockUser(id, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User blocked successfully",
    data: result,
  });
});

const suspendUser = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const userId = req.user?.userId as string;
  const result = await usersService.suspendUser(id, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User suspended successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const userId = req.user?.userId as string;
  const result = await usersService.deleteUser(id, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

export const usersController = {
  me,
  updateMyProfile,
  updateProfileImage,
  getAllUsers,
  blockUser,
  suspendUser,
  deleteUser,
  promoteToMentor,
};
