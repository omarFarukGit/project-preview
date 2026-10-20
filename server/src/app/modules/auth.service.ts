import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";
import { IRegisterPayload } from "./auth.interface";
import httpStatus from "http-status";
import config from "../config";

const register = async (payload: IRegisterPayload) => {
  const { name, email, password, role } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      "User with this email already exists",
    );
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createdUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      role: role,
      passwordHash: hashedPassword,
      status: "ACTIVE",
      isDeleted: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  return createdUser;
};

export const authServices = {
  register,
};
