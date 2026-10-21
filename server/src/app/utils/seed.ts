import bcrypt from "bcryptjs";
import config from "../config";
import { prisma } from "../lib/prisma";
import { AppError } from "./AppError";
import httpStatus from "http-status";
import { Role } from "../../generated/prisma/enums";

export const seedTesterStudent = async () => {
  try {
    const isTesterStudentExist = await prisma.user.findUnique({
      where: {
        email: config.tester_student_email,
      },
    });

    if (isTesterStudentExist) {
      console.log("Tester Student Already Exists!");
      return;
    }

    const name = config.tester_student_name;
    const email = config.tester_student_email;
    const password = config.tester_student_password;

    if (!name || !email || !password) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Tester Student Name, Email, Password Missing In Env File!!!",
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const testerStudent = await prisma.user.create({
      data: {
        name: name,
        email: email,
        role: Role.STUDENT,
        passwordHash: hashedPassword,
        status: "ACTIVE",
        isDeleted: false,
      },
    });

    console.log("Tester Student Created : ", testerStudent);
  } catch (error) {
    console.log("Error Seeding Tester Student : ", error);

    if (config.tester_student_email) {
      await prisma.user.delete({
        where: {
          email: config.tester_student_email,
        },
      });
    }
  }
};

export const seedTesterMentor = async () => {
  try {
    const isTesterMentorExist = await prisma.user.findUnique({
      where: {
        email: config.tester_mentor_email,
      },
    });

    if (isTesterMentorExist) {
      console.log("Tester Mentor Already Exists!");
      return;
    }

    const name = config.tester_mentor_name;
    const email = config.tester_mentor_email;
    const password = config.tester_mentor_password;

    if (!name || !email || !password) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Tester Mentor Name, Email, Password Missing In Env File!!!",
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const testerAdmin = await prisma.user.create({
      data: {
        name: name,
        email: email,
        role: Role.MENTOR,
        passwordHash: hashedPassword,
        status: "ACTIVE",
        isDeleted: false,
      },
    });

    console.log("Tester Mentor Created : ", testerAdmin);
  } catch (error) {
    console.log("Error Seeding Tester Mentor : ", error);

    if (config.tester_mentor_email) {
      await prisma.user.delete({
        where: {
          email: config.tester_mentor_email,
        },
      });
    }
  }
};


export const seedTesterAdmin = async () => {
  try {
    const isTesterAdminExist = await prisma.user.findUnique({
      where: {
        email: config.tester_admin_email,
      },
    });

    if (isTesterAdminExist) {
      console.log("Tester Admin Already Exists!");
      return;
    }

    const name = config.tester_admin_name;
    const email = config.tester_admin_email;
    const password = config.tester_admin_password;

    if (!name || !email || !password) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Tester Admin Name, Email, Password Missing In Env File!!!",
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const testerAdmin = await prisma.user.create({
      data: {
        name: name,
        email: email,
        role: Role.ADMIN,
        passwordHash: hashedPassword,
        status: "ACTIVE",
        isDeleted: false,
      },
    });

    console.log("Tester Admin Created : ", testerAdmin);
  } catch (error) {
    console.log("Error Seeding Tester Admin : ", error);

    if (config.tester_admin_email) {
      await prisma.user.delete({
        where: {
          email: config.tester_admin_email,
        },
      });
    }
  }
};
