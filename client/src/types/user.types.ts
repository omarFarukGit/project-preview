import { UpdateProfileFormValues } from "@/validation/user.validation";

export interface EditProfileDialogProps {
  user: UserProfileData;
  isPending?: boolean;
  onSubmit: (data: UpdateProfileFormValues) => Promise<void>;
}

export type UserRole = "STUDENT" | "MENTOR" | "ADMIN";
export type UserStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

export type UserProfileData = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isDeleted: boolean;
  status: UserStatus;
  imageUrl: string | null;
  imagePublicId: string | null;
  bio: string | null;
  phone: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type ProfileItemProps = {
  icon: React.ElementType;
  label: string;
  value: string;
};

export const profileFields = [
  {
    name: "name",
    label: "Full Name",
    placeholder: "Enter your full name",
    maxLength: 50,
  },
  {
    name: "bio",
    label: "Bio",
    placeholder: "Tell us about yourself",
    maxLength: 500,
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Enter your phone number",
    maxLength: 20,
  },
  {
    name: "country",
    label: "Country",
    placeholder: "Enter your country",
    maxLength: 100,
  },
  {
    name: "city",
    label: "City",
    placeholder: "Enter your city",
    maxLength: 100,
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Enter your address",
    maxLength: 250,
  },
  {
    name: "githubUrl",
    label: "GitHub URL",
    placeholder: "https://github.com/username",
    maxLength: 2048,
  },
  {
    name: "linkedinUrl",
    label: "LinkedIn URL",
    placeholder: "https://linkedin.com/in/username",
    maxLength: 2048,
  },
  {
    name: "portfolioUrl",
    label: "Portfolio URL",
    placeholder: "https://yourportfolio.com",
    maxLength: 2048,
  },
] as const;
