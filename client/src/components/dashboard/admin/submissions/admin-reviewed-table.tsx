
"use client";

import Link from "next/link";
import {
  ExternalLink,
  
  Globe,
  Eye,
  MessageSquare,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllReviewedSubmissions } from "@/hooks/overview.hook";
import { FaGithub } from "react-icons/fa";


type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

type ReviewedSubmission = {
  id: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  mentor: {
    id: string;
    name: string;
    email: string;
  };
  submission: {
    id: string;
    projectName: string;
    repoUrl: string;
    liveUrl: string;
    description: string;
    status: SubmissionStatus;
    createdAt: string;
    updatedAt: string;
    student: {
      id: string;
      name: string;
      email: string;
    };
  };
};

type ReviewedResponse = {
  totalReviews: number;
  reviews: ReviewedSubmission[];
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: SubmissionStatus }) {
  const styles: Record<SubmissionStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    APPROVED: "bg-green-100 text-green-800 hover:bg-green-100",
    REJECTED: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  return <Badge className={styles[status]}>{status}</Badge>;
}

function ReviewTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-4">
        {["review-row-1", "review-row-2", "review-row-3", "review-row-4"].map((rowKey) => (
          <Skeleton key={rowKey} className="h-12 w-full" />
        ))}
      </CardContent>
    </Card>
  );
}

export default function AdminReviewedTable() {
  const { data, isPending, isError } =
    useGetAllReviewedSubmissions();

  // API response: { success, statusCode, message, data }
  const result = data?.data as ReviewedResponse | undefined;

  if (isPending) {
    return <ReviewTableSkeleton />;
  }

  if (isError || !result) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-destructive">
          Failed to load reviewed submissions.
        </CardContent>
      </Card>
    );
  }

  const { totalReviews, reviews } = result;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>All Reviewed Submissions</CardTitle>
            <CardDescription>
              Review history from all mentors.
            </CardDescription>
          </div>

          <Badge variant="secondary" className="w-fit">
            <MessageSquare className="mr-1 size-3" />
            {totalReviews} Reviews
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {reviews.length === 0 ? (
          <div className="py-10 text-center">
            <MessageSquare className="mx-auto mb-3 size-8 text-muted-foreground" />
            <p className="font-medium">No reviews found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Reviewed submissions will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Mentor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Review Date</TableHead>
                  <TableHead>Links</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {reviews.map((review) => {
                  const submission = review.submission;

                  return (
                    <TableRow key={review.id}>
                      {/* Project */}
                      <TableCell>
                        <div className="min-w-36">
                          <p className="font-medium">
                            {submission.projectName}
                          </p>
                          <p className="mt-1 line-clamp-2 max-w-52 text-xs text-muted-foreground">
                            {submission.description}
                          </p>
                        </div>
                      </TableCell>

                      {/* Student */}
                      <TableCell>
                        <div className="min-w-36">
                          <p>{submission.student.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {submission.student.email}
                          </p>
                        </div>
                      </TableCell>

                      {/* Mentor */}
                      <TableCell>
                        <div className="min-w-36">
                          <p>{review.mentor.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {review.mentor.email}
                          </p>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <StatusBadge status={submission.status} />
                      </TableCell>

                      {/* Review Date */}
                      <TableCell className="whitespace-nowrap">
                        {formatDate(review.createdAt)}
                      </TableCell>

                      {/* Repository & Live Demo */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {submission.repoUrl && (
                            <Button
                              
                              size="icon"
                              variant="outline"
                              title="View repository"
                            >
                              <a
                                href={submission.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View repository"
                              >
                                <FaGithub className="size-4" />
                              </a>
                            </Button>
                          )}

                          {submission.liveUrl && (
                            <Button
                              size="icon"
                              variant="outline"
                              title="View live demo"
                            >
                              <a
                                href={submission.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View live demo"
                              >
                                <Globe className="size-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </TableCell>

                      {/* Details */}
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">
                          <Link
                          className=" flex justify-center items-center w-full gap-1"
                            href={`/admin-dashboard/submissions/${submission.id}`}
                          >
                            <Eye className="mr-2 size-4" />
                            Details
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
