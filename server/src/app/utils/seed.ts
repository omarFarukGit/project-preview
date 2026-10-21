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
      console.log("Tester Customer Already Exists!");
      return;
    }

    const name = config.tester_student_name;
    const email = config.tester_student_email;
    const password = config.tester_student_password;

    if (!name || !email || !password) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Tester Customer Name, Email, Password Missing In Env File!!!",
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
    console.log("Error Seeding Tester Customer : ", error);

    if (config.tester_student_email) {
      await prisma.user.delete({
        where: {
          email: config.tester_student_email,
        },
      });
    }
  }
};
