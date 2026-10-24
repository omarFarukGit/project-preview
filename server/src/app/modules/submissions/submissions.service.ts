import { Role, SubmissionStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { normalizeRepoUrl } from "../../utils/normalizeRepoUrl";
import {
  CreateSubmissionPayload,
  ReviewSubmissionPayload,
  SubmissionQuery,
} from "./submissions.interface";
import httpStatus from "http-status";

const createSubmissions = async (
  studentId: string,
  payload: CreateSubmissionPayload,
) => {
  const normalizedRepoUrl = normalizeRepoUrl(payload.repoUrl);

  const existingSubmission = await prisma.submission.findUnique({
    where: {
      studentId_normalizedRepoUrl: {
        studentId,
        normalizedRepoUrl,
      },
    },
  });

  if (existingSubmission) {
    throw new AppError(
      httpStatus.CONFLICT,
      "You have already submitted this repository",
    );
  }
  const createSubmition = await prisma.submission.create({
    data: {
      projectName: payload.projectName.trim(),
      repoUrl: payload.repoUrl.trim(),
      normalizedRepoUrl,
      liveUrl: payload.liveUrl.trim(),
      description: payload.description.trim(),
      studentId,
      status: SubmissionStatus.PENDING,
    },
  });

  return createSubmition;
};

const getMySubmissions = async (studentId: string, query: SubmissionQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;

  const sortBy = query.sortBy ?? "createdAt";
  const sortOrder = query.sortOrder ?? "desc";

  const andConditions = [];

  if (query.searchTerm) {
    andConditions.push({
      projectName: {
        contains: query.searchTerm,
        mode: "insensitive" as const,
      },
    });
  }

  if (query.status) {
    andConditions.push({
      status: query.status,
    });
  }

  const where = {
    studentId,
    AND: andConditions,
  };

  const [submissions, total] = await Promise.all([
    prisma.submission.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),

    prisma.submission.count({
      where,
    }),
  ]);

  return {
    data: submissions,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getAllSubmissions = async (query: SubmissionQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";

  const andConditions = [];

  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          projectName: {
            contains: query.searchTerm,
            mode: "insensitive" as const,
          },
        },
        {
          student: {
            name: {
              contains: query.searchTerm,
              mode: "insensitive" as const,
            },
          },
        },
        {
          student: {
            email: {
              contains: query.searchTerm,
              mode: "insensitive" as const,
            },
          },
        },
      ],
    });
  }

  if (query.status) {
    andConditions.push({
      status: query.status,
    });
  }

  const submissions = await prisma.submission.findMany({
    where: {
      AND: andConditions,
    },
    take: limit,
    skip: skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      student: {
        select: { id: true, name: true, email: true },
      },
      reviewedBy: {
        select: { id: true, name: true },
      },
    },
  });
  const total = await prisma.submission.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    data: submissions,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getSubmissionById = async (
  submissionId: string,
  userId: string,
  role: Role,
) => {
  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
    include: {
      student: {
        select: { id: true, name: true, email: true },
      },
      reviewedBy: {
        select: { id: true, name: true },
      },
      feedbacks: {
        orderBy: { createdAt: "desc" },
        include: {
          mentor: { select: { id: true, name: true } },
        },
      },
    },
  });

  if (!submission) {
    throw new AppError(httpStatus.NOT_FOUND, "Submission not found");
  }

  if (role === Role.STUDENT && submission.studentId !== userId) {
    throw new AppError(httpStatus.FORBIDDEN, "You cannot view this submission");
  }

  return submission;
};

const reviewSubmission = async (
  submissionId: string,
  mentorId: string,
  payload: ReviewSubmissionPayload,
) => {
  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
    select: { id: true, status: true },
  });

  if (!submission) {
    throw new AppError(httpStatus.NOT_FOUND, "Submission not found");
  }

  if (submission.status !== SubmissionStatus.PENDING) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Only pending submissions can be reviewed",
    );
  }

  return prisma.$transaction(async (tx) => {
    const updated = await tx.submission.updateMany({
      where: {
        id: submissionId,
        status: SubmissionStatus.PENDING,
      },
      data: {
        status: payload.status,
        reviewedById: mentorId,
      },
    });

    if (updated.count === 0) {
      throw new AppError(
        httpStatus.CONFLICT,
        "Submission has already been reviewed",
      );
    }

    await tx.feedback.create({
      data: {
        comment: payload.feedback,
        submissionId,
        mentorId,
      },
    });

    return tx.submission.findUnique({
      where: { id: submissionId },
      include: {
        student: { select: { id: true, name: true, email: true } },
        reviewedBy: { select: { id: true, name: true } },
        feedbacks: { orderBy: { createdAt: "desc" } },
      },
    });
  });
};

const getSubmissionStats = async () => {
  const [total, pending, approved, rejected] = await Promise.all([
    prisma.submission.count(),
    prisma.submission.count({ where: { status: "PENDING" } }),
    prisma.submission.count({ where: { status: "APPROVED" } }),
    prisma.submission.count({ where: { status: "REJECTED" } }),
  ]);

  return { total, pending, approved, rejected };
};

const getStudentStats = async (studentId: string) => {
  const [total, pending, approved, rejected, recentSubmissions, recentReviews] =
    await Promise.all([
      prisma.submission.count({
        where: { studentId },
      }),

      prisma.submission.count({
        where: { studentId, status: "PENDING" },
      }),

      prisma.submission.count({
        where: { studentId, status: "APPROVED" },
      }),

      prisma.submission.count({
        where: { studentId, status: "REJECTED" },
      }),

      // Recent submissions
      prisma.submission.findMany({
        where: { studentId },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          projectName: true,
          repoUrl: true,
          liveUrl: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),

      // Recent reviews
      prisma.submission.findMany({
        where: {
          studentId,
          feedbacks: {
            some: {},
          },
        },
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: {
          id: true,
          projectName: true,
          status: true,
          updatedAt: true,
          feedbacks: {
            orderBy: { createdAt: "desc" },
            take: 1,
            select: {
              id: true,
              comment: true,
              createdAt: true,
              mentor: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      }),
    ]);

  return {
    stats: {
      total,
      pending,
      approved,
      rejected,
      approvalRate: total > 0 ? Math.round((approved / total) * 100) : 0,
    },
    recentSubmissions,
    recentReviews,
  };
};

export const submissionsService = {
  createSubmissions,
  getMySubmissions,
  getAllSubmissions,
  getSubmissionById,
  getSubmissionStats,
  reviewSubmission,
  getStudentStats,
};
