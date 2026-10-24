"use client";

import Link from "next/link";
import {
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
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useGetMentorOverview } from "@/hooks/submissions.hook";

type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

type MentorOverviewData = {
  stats: {
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
    status: SubmissionStatus;
    createdAt: string;
    student: {
      id: string;
      name: string;
      email: string;
    };
  }[];
  recentReviews: {
    id: string;
    comment: string;
    createdAt: string;
    submission: {
      id: string;
      projectName: string;
      status: SubmissionStatus;
      student: {
        id: string;
        name: string;
      };
    };
  }[];
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: SubmissionStatus }) {
  const variants: Record<
    SubmissionStatus,
    "default" | "secondary" | "destructive" | "outline"
  > = {
    PENDING: "secondary",
    APPROVED: "default",
    REJECTED: "destructive",
  };

  return <Badge variant={variants[status]}>{status}</Badge>;
}

function OverviewSkeleton() {
  const skeletonCards = [
    "Submissions",
    "Pending Reviews",
    "Mentorships",
    "Team Members",
    "Feedback",
    "Progress",
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {skeletonCards.map((label) => (
          <Card key={label}>
            <CardContent className="space-y-3 p-6">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-36" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Skeleton className="h-48 w-full" />
    </div>
  );
}

export default function MentorOverview() {
  const { data, isPending, isError } = useGetMentorOverview();

  // API envelope: { success, statusCode, message, data }
  const overview = data?.data as MentorOverviewData | undefined;

  if (isPending) return <OverviewSkeleton />;

  if (isError || !overview) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-destructive">
          Failed to load mentor overview. Please try again.
        </CardContent>
      </Card>
    );
  }

  const { stats, recentSubmissions, recentReviews } = overview;

  const statCards = [
    {
      title: "Total Submissions",
      value: stats.totalSubmissions,
      description: "Across all students",
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
      title: "My Reviews",
      value: stats.totalReviews,
      description: "Reviews submitted by you",
      icon: MessageSquare,
    },
    {
      title: "Approval Rate",
      value: `${stats.approvalRate}%`,
      description: "Approved / all submissions",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mentor Overview</h1>
        <p className="text-sm text-muted-foreground">
          Track submissions, review activity, and project approval status.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 xl:grid-cols-3">
        {statCards.map((item) => {
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

                {item.title === "Approval Rate" && (
                  <Progress
                    value={Math.min(100, Math.max(0, stats.approvalRate))}
                    className="mt-3"
                  />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Submissions */}
      <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 ">
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>
              Latest submissions from all students.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {recentSubmissions.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No submissions found.
              </p>
            ) : (
              <div className="space-y-4">
                {recentSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 space-y-1">
                      <p className="truncate font-medium">
                        {submission.projectName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {submission.student.name} · {submission.student.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Submitted {formatDate(submission.createdAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <StatusBadge status={submission.status} />
                      <Button size="sm" variant="outline">
                        <Link
                          className=" flex justify-center items-center gap-1"
                          href={`/mentor-dashboard/submissions/${submission.id}`}
                        >
                          View <ExternalLink className="ml-2 size-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>My Recent Reviews</CardTitle>
            <CardDescription>
              The latest reviews submitted by you.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {recentReviews.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                You have not reviewed any submissions yet.
              </p>
            ) : (
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="space-y-3 rounded-lg border p-4"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <p className="font-medium">
                          {review.submission.projectName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Student: {review.submission.student.name}
                        </p>
                      </div>
                      <StatusBadge status={review.submission.status} />
                    </div>

                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {review.comment}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs text-muted-foreground">
                        Reviewed {formatDate(review.createdAt)}
                      </span>

                      <Button size="sm" variant="outline">
                        <Link
                          href={`/mentor-dashboard/submissions/${review.submission.id}`}
                        >
                          View Submission
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
