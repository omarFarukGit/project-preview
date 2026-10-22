export const demoCredentials = {
  STUDENT: {
    label: "Student",
    email: "student@example.com",
    password: "Student123!",
    route: "/student",
  },
  MENTOR: {
    label: "Mentor",
    email: "mentor@example.com",
    password: "Mentor123!",
    route: "/mentor",
  },
  ADMIN: {
    label: "Admin",
    email: "admin@example.com",
    password: "Admin123!",
    route: "/admin",
  },
} as const;

export type DemoRole = keyof typeof demoCredentials;
export type TLoginPayload = {
  email: string;
  password: string;
};

export type UserRole = "ADMIN" | "MENTOR" | "STUDENT";
