export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "STUDENT";
}

export interface ILoginPayload {
  email: string;
  password: string;
}
