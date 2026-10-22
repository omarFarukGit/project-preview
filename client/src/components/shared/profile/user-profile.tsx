"use client";

import Image from "next/image";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import {
  useGetMe,
  useUpdateMyProfileInformation,
  useUpdateMyProfileImage,
} from "@/hooks/auth.hook";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import EditProfileDialog from "./edit-profile-dialog";
import UpdateProfileImage from "./update-profile-image";
import { toast } from "@/components/ui/toast";
import { ApiResponse, UserProfileData } from "@/types/user.types";
import { UpdateProfileFormValues } from "@/validation/user.validation";
import { formatDate, getInitials, getStatusVariant } from "@/utils/user-utils";
import ProfileItem from "./profile-items";

export default function UserProfile() {
  const queryClient = useQueryClient();

  const { data: response, isLoading, isError, error, refetch } = useGetMe();

  const updateProfileMutation = useUpdateMyProfileInformation();
  const updateProfileImageMutation = useUpdateMyProfileImage();

  // Expected API response: { success, statusCode, message, data: user }
  const user = (response as ApiResponse<UserProfileData> | undefined)?.data;

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
          error instanceof Error ? error.message : "Failed to update profile",
        type: "error",
      });

      throw error;
    }
  };

  const handleUpdateProfileImage = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
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
      <div className="space-y-6 bg-background text-foreground">
        <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />

        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-4">
              <div className="size-24 animate-pulse rounded-full bg-muted" />
              <div className="flex-1 space-y-3">
                <div className="h-5 w-40 animate-pulse rounded bg-muted" />
                <div className="h-4 w-56 animate-pulse rounded bg-muted" />
                <div className="h-5 w-24 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item}>
              <CardContent className="space-y-4 p-6">
                <div className="h-5 w-40 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <Card className="border-border bg-card text-card-foreground">
        <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-muted">
            <UserRound className="size-7 text-muted-foreground" />
          </div>

          <h2 className="text-lg font-semibold">Unable to load your profile</h2>

          <p className="text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Something went wrong. Please try again."}
          </p>

          <Button onClick={() => void refetch()} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const joinedDate = formatDate(user.createdAt);
  const updatedDate = formatDate(user.updatedAt);
  const initials = getInitials(user.name);

  return (
    <main className="min-h-screen space-y-6 bg-background text-foreground">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal information and account details.
        </p>
      </div>

      {/* Profile Header */}
      <Card className="overflow-hidden border-border bg-card text-card-foreground">
        <div className="h-28 bg-primary/10 sm:h-36" />

        <CardContent className="-mt-12 p-6 sm:-mt-14">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
            {/* Avatar */}
            <div className="relative size-24 shrink-0 sm:size-28">
              <div className="flex size-24 items-center justify-center overflow-hidden rounded-full border-4 border-card bg-primary/10 text-2xl font-bold text-primary sm:size-28">
                {user.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt={user.name}
                    width={224}
                    height={224}
                    className="size-full object-cover"
                    unoptimized
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
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/80 text-xs font-medium">
                  Uploading...
                </div>
              )}
            </div>

            {/* User information */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="break-words text-xl font-bold sm:text-2xl">
                  {user.name}
                </h2>

                <Badge variant="outline">{user.role}</Badge>

                <Badge variant={getStatusVariant(user.status)}>
                  {user.status === "ACTIVE" && (
                    <CheckCircle2 className="mr-1 size-3.5" />
                  )}
                  {user.status}
                </Badge>

                {user.isDeleted && <Badge variant="destructive">Deleted</Badge>}
              </div>

              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="size-4 shrink-0" />
                <span className="break-all">{user.email}</span>
              </p>

              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="size-4 shrink-0" />
                Member since {joinedDate}
              </p>

              {user.bio && (
                <p className="mt-3 max-w-2xl whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                  {user.bio}
                </p>
              )}
            </div>

            {/* Edit profile */}
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

      {/* Information Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <Card className="border-border bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserRound className="size-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <ProfileItem icon={UserRound} label="Full Name" value={user.name} />

            <Separator />

            <ProfileItem icon={Mail} label="Email Address" value={user.email} />

            <Separator />

            <ProfileItem
              icon={Phone}
              label="Phone Number"
              value={user.phone || "Not provided"}
            />

            <Separator />

            <ProfileItem
              icon={FileText}
              label="Bio"
              value={user.bio || "No bio added yet"}
            />
          </CardContent>
        </Card>

        {/* Location Information */}
        <Card className="border-border bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="size-5 text-primary" />
              Location Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <ProfileItem
              icon={Globe}
              label="Country"
              value={user.country || "Not provided"}
            />

            <Separator />

            <ProfileItem
              icon={MapPin}
              label="City"
              value={user.city || "Not provided"}
            />

            <Separator />

            <ProfileItem
              icon={MapPin}
              label="Address"
              value={user.address || "Not provided"}
            />
          </CardContent>
        </Card>

        {/* Social Profiles */}
        <Card className="border-border bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="size-5 text-primary" />
              Social Profiles
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <ProfileItem
              icon={Mail}
              label="GitHub"
              value={user.githubUrl || "Not provided"}
            />

            <Separator />

            <ProfileItem
              icon={Mail}
              label="LinkedIn"
              value={user.linkedinUrl || "Not provided"}
            />

            <Separator />

            <ProfileItem
              icon={Globe}
              label="Portfolio"
              value={user.portfolioUrl || "Not provided"}
            />
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card className="border-border bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldCheck className="size-5 text-primary" />
              Account Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <ProfileItem
              icon={ShieldCheck}
              label="Account Role"
              value={user.role}
            />

            <Separator />

            <ProfileItem
              icon={CheckCircle2}
              label="Account Status"
              value={user.status}
            />

            <Separator />

            <ProfileItem
              icon={CalendarDays}
              label="Member Since"
              value={joinedDate}
            />

            <Separator />

            <ProfileItem
              icon={Clock3}
              label="Last Updated"
              value={updatedDate}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
