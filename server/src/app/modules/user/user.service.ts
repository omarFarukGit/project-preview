import { Role, UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status";
import { GetAllUsersQuery } from "./user.interface";

const me = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    omit: {
      passwordHash: true,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return user;
};

const promoteToMentor = async (userId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      isDeleted: false,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.role !== Role.STUDENT) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only students can be promoted to mentor",
    );
  }

  if (user.status !== UserStatus.ACTIVE) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only active students can be promoted",
    );
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: Role.MENTOR,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      updatedAt: true,
    },
  });

  return updatedUser;
};

const getAllUsers = async (query: GetAllUsersQuery) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
  const skip = (page - 1) * limit;

  const allowedRoles = Object.values(Role);
  const allowedStatuses = Object.values(UserStatus);

  if (query.role && !allowedRoles.includes(query.role as Role)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid user role");
  }

  if (query.status && !allowedStatuses.includes(query.status as UserStatus)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid user status");
  }

  const where = {
    isDeleted: false,
    ...(query.role ? { role: query.role as Role } : {}),
    ...(query.status ? { status: query.status as UserStatus } : {}),
    ...(query.search?.trim()
      ? {
          OR: [
            {
              name: {
                contains: query.search.trim(),
                mode: "insensitive" as const,
              },
            },
            {
              email: {
                contains: query.search.trim(),
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {}),
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        isDeleted: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: users,
  };
};

const updateUserStatus = async (
  userId: string,
  status: "BLOCKED" | "SUSPENDED",
  adminId: string,
) => {
  if (userId === adminId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You cannot change your own account status",
    );
  }

  const user = await prisma.user.findFirst({
    where: { id: userId, isDeleted: false },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.role === Role.ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Admin accounts cannot be blocked or suspended through this API",
    );
  }

  if (user.status === status) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `User is already ${status.toLowerCase()}`,
    );
  }

  return prisma.user.update({
    where: { id: userId },
    data: { status },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      updatedAt: true,
    },
  });
};

const blockUser = async (userId: string, adminId: string) => {
  return updateUserStatus(userId, UserStatus.BLOCKED, adminId);
};

const suspendUser = async (userId: string, adminId: string) => {
  return updateUserStatus(userId, UserStatus.SUSPENDED, adminId);
};

const deleteUser = async (userId: string, adminId: string) => {
  if (userId === adminId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You cannot delete your own account",
    );
  }

  const user = await prisma.user.findFirst({
    where: { id: userId, isDeleted: false },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.role === Role.ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Admin accounts cannot be deleted through this API",
    );
  }

  return prisma.user.update({
    where: { id: userId },
    data: { isDeleted: true },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      isDeleted: true,
      updatedAt: true,
    },
  });
};

export const usersService = {
  me,
  promoteToMentor,
  getAllUsers,
  blockUser,
  suspendUser,
  deleteUser,
};
