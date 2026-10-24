"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SubmissionStatus } from "@/types/submissions.types";
import { useReview } from "@/hooks/review.hook";
import { toast } from "@/components/ui/toast";

interface MentorReviewModalProps {
  submissionId: string;
  currentStatus: SubmissionStatus;
  currentFeedback?: string;
}

export function SubmissionReviewModal({
  submissionId,
  currentStatus,
  currentFeedback = "",
}: MentorReviewModalProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"APPROVED" | "REJECTED">(
    currentStatus === "REJECTED" ? "REJECTED" : "APPROVED",
  );
  const [feedback, setFeedback] = useState(currentFeedback);

  const { mutateAsync, isPending } = useReview();

  async function handleReview() {
    if (!feedback.trim()) {
      toast.add({
        description: "Please provide feedback.",
        type: "error",
      });
      return;
    }

    try {
      await mutateAsync({
        id: submissionId,
        payload: {
          status,
          feedback: feedback.trim(),
        },
      });
      toast.add({
        description: "Review submitted successfully..",
        type: "success",
      });
      setOpen(false);
      return;
    } catch {
      toast.add({
        description: "Failed to submit review. Please try again.",
        type: "error",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className={"cursor-pointer"}>Review Submission</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Review Submission</DialogTitle>
          <DialogDescription>
            Review the student's project and provide feedback.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="review-status">Review Status</Label>

            <Select
              value={status}
              onValueChange={(value) =>
                setStatus(value as "APPROVED" | "REJECTED")
              }
            >
              <SelectTrigger id="review-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-feedback">Feedback</Label>

            <Textarea
              id="review-feedback"
              placeholder="Write constructive feedback for the student..."
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              rows={15}
              className="min-h-64 resize-y"
              disabled={isPending}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            className={"cursor-pointer"}
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            className={"cursor-pointer"}
            onClick={handleReview}
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
