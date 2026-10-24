"use client";

import { useState } from "react";

import { GraduationCap, Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { usePromoteToMentor } from "@/hooks/admin.hook";
import { toast } from "@/components/ui/toast";

interface PromoteMentorDialogProps {
  userId: string;
  userName: string;
}

export default function PromoteMentorDialog({
  userId,
  userName,
}: PromoteMentorDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = usePromoteToMentor();

  async function handleConfirm() {
    try {
      await mutateAsync(userId);

      toast.add({
        description: "promoted to mentor successfully.",
        type: "success",
      });
      setOpen(false);
    } catch {
      toast.add({
        description: "Failed to promote user to mentor.",
        type: "error",
      });
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Button
          className={"cursor-pointer"}
          type="button"
          variant="outline"
          size="sm"
          disabled={isPending}
        >
          <GraduationCap className="mr-2 size-4" />
          Promote
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Promote to Mentor?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to promote{" "}
            <span className="font-semibold text-foreground">{userName}</span> to
            Mentor? This will change their role.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className={"cursor-pointer"} disabled={isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            className={"cursor-pointer"}
            disabled={isPending}
            onClick={(event) => {
              event.preventDefault();
              void handleConfirm();
            }}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Promoting...
              </>
            ) : (
              "Confirm"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
