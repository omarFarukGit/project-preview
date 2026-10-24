
"use client";

import Link from "next/link";
import {
  Users,
  GraduationCap,
  UserRoundCheck,
  ShieldCheck,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  TrendingUp,
  ExternalLink,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAdminOverview } from "@/hooks/submissions.hook";

type Status = "PENDING" | "APPROVED" | "REJECTED";
type UserRole = "STUDENT" | "MENTOR" | "ADMIN";

type AdminOverviewData = {
  stats: {
    totalUsers: number;
    totalStudents: number;
    totalMentors: number;
    totalAdmins: number;
    totalSubmissions: number;
    pending: number;
    approved: number;
    rejected: number;
    totalReviews: number;
    approvalRate: number;
  };
  recentSubmissions: {
    id: string;
    projectName: string;
    status: Status;
    createdAt: string;
    student: {
      id: string;
      name: string;
      email: string;
    };
  }[];
  recentUsers: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
  }[];
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    APPROVED: "bg-green-100 text-green-800 hover:bg-green-100",
    REJECTED: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  return <Badge className={styles[status]}>{status}</Badge>;
}

function RoleBadge({ role }: { role: UserRole }) {
  const styles: Record<UserRole, string> = {
    STUDENT: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    MENTOR: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    ADMIN: "bg-orange-100 text-orange-800 hover:bg-orange-100",
  };

  return <Badge className={styles[role]}>{role}</Badge>;
}

function OverviewSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {["overview-card-a", "overview-card-b", "overview-card-c", "overview-card-d", "overview-card-e", "overview-card-f", "overview-card-g", "overview-card-h", "overview-card-i"].map((key) => (
          <Card key={key}>
            <CardContent className="space-y-3 p-6">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-36" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Skeleton className="h-72 w-full" />
      <Skeleton className="h-72 w-full" />
    </div>
  );
}

export default function AdminOverview() {
  const { data, isPending, isError } = useGetAdminOverview();

  // API response: { success, statusCode, message, data }
  const overview = data?.data as AdminOverviewData | undefined;

  if (isPending) {
    return <OverviewSkeleton />;
  }

  if (isError || !overview) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-destructive">
          Failed to load admin overview. Please try again.
        </CardContent>
      </Card>
    );
  }

  const { stats, recentSubmissions, recentUsers } = overview;

  const userStats = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      description: "All registered users",
      icon: Users,
    },
    {
      title: "Students",
      value: stats.totalStudents,
      description: "Registered students",
      icon: GraduationCap,
    },
    {
      title: "Mentors",
      value: stats.totalMentors,
      description: "Registered mentors",
      icon: UserRoundCheck,
    },
    {
      title: "Admins",
      value: stats.totalAdmins,
      description: "Administrator accounts",
      icon: ShieldCheck,
    },
  ];

  const submissionStats = [
    {
      title: "Total Submissions",
      value: stats.totalSubmissions,
      description: "Submissions from all students",
      icon: FileText,
    },
    {
      title: "Pending",
      value: stats.pending,
      description: "Awaiting review",
      icon: Clock,
    },
    {
      title: "Approved",
      value: stats.approved,
      description: "Approved projects",
      icon: CheckCircle2,
    },
    {
      title: "Rejected",
      value: stats.rejected,
      description: "Rejected projects",
      icon: XCircle,
    },
    {
      title: "Total Reviews",
      value: stats.totalReviews,
      description: "All mentor feedback records",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Admin Overview
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitor users, submissions, and mentor review activity.
        </p>
      </div>

      {/* User Statistics */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">User Statistics</h2>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 xl:grid-cols-4">
          {userStats.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.title}
                  </CardTitle>
                  <Icon className="size-4 text-muted-foreground" />
                </CardHeader>

                <CardContent>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Submission Statistics */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          Submission Statistics
        </h2>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 xl:grid-cols-3">
          {submissionStats.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.title}
                  </CardTitle>
                  <Icon className="size-4 text-muted-foreground" />
                </CardHeader>

                <CardContent>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Approval Rate */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-muted-foreground" />
              <CardTitle>Approval Rate</CardTitle>
            </div>
            <CardDescription>
              Percentage of all submissions that have been approved.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Overall approval
              </span>
              <span className="text-2xl font-bold">
                {stats.approvalRate}%
              </span>
            </div>

            <Progress
              value={Math.min(100, Math.max(0, stats.approvalRate))}
              className="h-2"
            />
          </CardContent>
        </Card>
      </section>

      {/* Recent Submissions */}

<CardContent>
  {recentSubmissions.length === 0 ? (
    <p className="py-8 text-center text-sm text-muted-foreground">
      No submissions found.
    </p>
  ) : (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recentSubmissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="max-w-[180px] truncate font-medium">
                  {submission.projectName}
                </TableCell>

                <TableCell>
                  <div className="min-w-0">
                    <p className="break-words">{submission.student.name}</p>
                    <p className="break-all text-xs text-muted-foreground">
                      {submission.student.email}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <StatusBadge status={submission.status} />
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {formatDate(submission.createdAt)}
                </TableCell>

                <TableCell className="text-right">
                  <Button size="sm" variant="outline" >
                    <Link
                    className=" flex justify-center items-center gap-1 w-full"
                      href={`/admin-dashboard/submissions/${submission.id}`}
                    >
                      View
                      <ExternalLink className="size-3" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-3 md:hidden">
        {recentSubmissions.map((submission) => (
          <div
            key={submission.id}
            className="min-w-0 space-y-3 rounded-lg border p-3"
          >
            <div className="min-w-0">
              <h3 className="break-words font-semibold">
                {submission.projectName}
              </h3>

              <p className="mt-1 break-words text-sm text-muted-foreground">
                {submission.student.name}
              </p>

              <p className="break-all text-xs text-muted-foreground">
                {submission.student.email}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3">
              <div className="space-y-1">
                <StatusBadge status={submission.status} />
                <p className="text-xs text-muted-foreground">
                  {formatDate(submission.createdAt)}
                </p>
              </div>

              <Button size="icon" variant="outline" className="size-8">
                <Link
                  href={`/admin-dashboard/submissions/${submission.id}`}
                  aria-label={`View ${submission.projectName}`}
                >
                  <ExternalLink className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  )}
</CardContent>


      {/* Recent Users */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
          <CardDescription>
            The latest registered users in the application.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {recentUsers.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No users found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.name}
                      </TableCell>

                      <TableCell>{user.email}</TableCell>

                      <TableCell>
                        <RoleBadge role={user.role} />
                      </TableCell>

                      <TableCell className="whitespace-nowrap">
                        {formatDate(user.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
