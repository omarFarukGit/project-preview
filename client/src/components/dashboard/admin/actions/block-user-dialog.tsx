"use client";

import { useState } from "react";
import { Ban, Loader2 } from "lucide-react";

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
import { useBlockUser } from "@/hooks/admin.hook";

interface BlockUserDialogProps {
  userId: string;
  userName: string;
  disabled?: boolean;
}

export default function BlockUserDialog({
  userId,
  userName,
  disabled = false,
}: BlockUserDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useBlockUser();

  async function handleConfirm() {
    try {
      await mutateAsync(userId);

      toast.add({
        description: `${userName} blocked successfully.`,
        type: "success",
      });

      setOpen(false);
    } catch {
      toast.add({
        description: "Failed to block user.",
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
          className="size-8 cursor-pointer text-orange-600"
          disabled={disabled || isPending}
          title="Block user"
          aria-label={`Block ${userName}`}
        >
          <Ban className="size-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Block User?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to block{" "}
            <span className="font-semibold text-foreground">{userName}</span>?
            This action may prevent the user from accessing the platform.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className={"cursor-pointer"} disabled={isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            className="bg-destructive cursor-pointer text-destructive-foreground hover:bg-destructive/90"
            onClick={(event) => {
              event.preventDefault();
              void handleConfirm();
            }}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Blocking...
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
