export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "STUDENT";

  bio?: string;
  phone?: string;
  country?: string;
  city?: string;
  address?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}
