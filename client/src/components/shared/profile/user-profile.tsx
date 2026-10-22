
"use client";

import {
  CalendarDays,
  CheckCircle2,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { UpdateProfileFormValues } from "./edit-profile-dialog";
import EditProfileDialog from "./edit-profile-dialog";
import UpdateProfileImage from "./update-profile-image";
import { toast } from "@/components/ui/toast";
import { useGetMe, useUpdateMyProfileImage, useUpdateMyProfileInformation } from "@/hooks/auth.hook";


type UserProfileData = {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "MENTOR" | "ADMIN";
  isDeleted: boolean;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  imageUrl: string | null;
  imagePublicId: string | null;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export default function UserProfile() {
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetMe();

  const updateProfileMutation = useUpdateMyProfileInformation();
  const updateProfileImageMutation = useUpdateMyProfileImage();

  // Expected response: { success, statusCode, message, data: user }
  const user = (
    response as ApiResponse<UserProfileData> | undefined
  )?.data;

  const handleUpdateProfile = async (
    data: UpdateProfileFormValues,
  ): Promise<void> => {
    try {
      await updateProfileMutation.mutateAsync(data);

      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      await refetch();

      toast.add({
        description: "Profile updated successfully",
        type: "success",
      });
    } catch (error) {
      toast.add({
        description:
          error instanceof Error
            ? error.message
            : "Failed to update profile",
        type: "error",
      });

      throw error;
    }
  };

  const handleUpdateProfileImage = async (
    file: File,
  ): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      await updateProfileImageMutation.mutateAsync(formData);

      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      await refetch();

      toast.add({
        description: "Profile image updated successfully",
        type: "success",
      });
    } catch (error) {
      toast.add({
        description:
          error instanceof Error
            ? error.message
            : "Failed to update profile image",
        type: "error",
      });

      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        {["profile", "account", "activity", "security"].map(
          (section) => (
            <Card key={section}>
              <CardContent className="space-y-4 p-6">
                <div className="h-6 w-40 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              </CardContent>
            </Card>
          ),
        )}
      </div>
    );
  }

  if (isError || !user) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
          <p className="font-medium text-foreground">
            Unable to load your profile.
          </p>

          <p className="text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Please try again."}
          </p>

          <Button onClick={() => refetch()} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const initials =
    user.name
      ?.trim()
      .split(/\s+/)
      .map((word) => word.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Profile Image */}
            <div className="relative h-24 w-24 shrink-0">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border bg-primary/10 text-2xl font-bold text-primary">
                {user.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt={user.name}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              <UpdateProfileImage
                imageUrl={user.imageUrl}
                userName={user.name}
                onSubmit={handleUpdateProfileImage}
                isPending={updateProfileImageMutation.isPending}
              />

              {updateProfileImageMutation.isPending && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/80 text-xs font-medium text-foreground">
                  Uploading...
                </div>
              )}
            </div>

            {/* User Information */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  {user.name}
                </h1>

                <Badge variant="secondary">{user.role}</Badge>

                <Badge
                  variant={
                    user.status === "ACTIVE" ? "default" : "secondary"
                  }
                >
                  {user.status === "ACTIVE" && (
                    <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                  )}
                  {user.status}
                </Badge>
              </div>

              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="break-all">{user.email}</span>
              </p>

              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4 shrink-0" />
                Member since {formatDate(user.createdAt)}
              </p>
            </div>

            {/* Edit Profile */}
            <div className="shrink-0">
              <EditProfileDialog
                user={user}
                onSubmit={handleUpdateProfile}
                isPending={updateProfileMutation.isPending}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserRound className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <ProfileItem
              icon={UserRound}
              label="Full Name"
              value={user.name}
            />

            <ProfileItem
              icon={Mail}
              label="Email Address"
              value={user.email}
            />
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Account Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <ProfileItem
              icon={ShieldCheck}
              label="Account Role"
              value={user.role}
            />

            <ProfileItem
              icon={CheckCircle2}
              label="Account Status"
              value={user.status}
            />

            <ProfileItem
              icon={ShieldCheck}
              label="Account Deleted"
              value={user.isDeleted ? "Yes" : "No"}
            />
          </CardContent>
        </Card>

        {/* Account Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              Account Activity
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-5 sm:grid-cols-2">
            <ProfileItem
              icon={CalendarDays}
              label="Member Since"
              value={formatDate(user.createdAt)}
            />

            <ProfileItem
              icon={CalendarDays}
              label="Last Updated"
              value={formatDate(user.updatedAt)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

type ProfileItemProps = {
  icon: React.ElementType;
  label: string;
  value: string;
};

function ProfileItem({
  icon: Icon,
  label,
  value,
}: ProfileItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}
