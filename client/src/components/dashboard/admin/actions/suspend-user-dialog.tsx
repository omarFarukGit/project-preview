"use client";

import { useState } from "react";
import { ShieldAlert, Loader2 } from "lucide-react";

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
import { useSuspendUser } from "@/hooks/admin.hook";

interface SuspendUserDialogProps {
  userId: string;
  userName: string;
  disabled?: boolean;
}

export default function SuspendUserDialog({
  userId,
  userName,
  disabled = false,
}: SuspendUserDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useSuspendUser();

  async function handleConfirm() {
    try {
      await mutateAsync(userId);

      toast.add({
        description: `${userName} suspended successfully.`,
        type: "success",
      });

      setOpen(false);
    } catch {
      toast.add({
        description: "Failed to suspend user.",
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
          className="size-8 cursor-pointer text-amber-600"
          disabled={disabled || isPending}
          title="Suspend user"
          aria-label={`Suspend ${userName}`}
        >
          <ShieldAlert className="size-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Suspend User?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to suspend{" "}
            <span className="font-semibold text-foreground">{userName}</span>?
            The user's access may be restricted until reactivated.
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
                Suspending...
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
