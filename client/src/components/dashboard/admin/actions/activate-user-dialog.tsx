"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

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
import { toast } from "@/components/ui/toast";
import { useActivateUser } from "@/hooks/admin.hook";

interface ActivateUserDialogProps {
  userId: string;
  userName: string;
  disabled?: boolean;
}

export default function ActivateUserDialog({
  userId,
  userName,
  disabled = false,
}: ActivateUserDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useActivateUser();

  async function handleConfirm() {
    try {
      await mutateAsync(userId);

      toast.add({
        description: `${userName} activated successfully.`,
        type: "success",
      });

      setOpen(false);
    } catch {
      toast.add({
        description: "Failed to activate user.",
        type: "error",
      });
      setOpen(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 cursor-pointer text-green-600"
          disabled={disabled || isPending}
          title="Activate user"
          aria-label={`Activate ${userName}`}
        >
          <CheckCircle className="size-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Activate User?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to activate{" "}
            <span className="font-semibold text-foreground">{userName}</span>?
            This will restore the user's access according to their permissions.
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
                Activating...
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
