"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";

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
import { useDeleteUser } from "@/hooks/admin.hook";

interface DeleteUserDialogProps {
  userId: string;
  userName: string;
  disabled?: boolean;
}

export default function DeleteUserDialog({
  userId,
  userName,
  disabled = false,
}: DeleteUserDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useDeleteUser();

  async function handleConfirm() {
    try {
      await mutateAsync(userId);

      toast.add({
        description: `${userName} deleted successfully.`,
        type: "success",
      });

      setOpen(false);
    } catch {
      toast.add({
        description: "Failed to delete user.",
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
          variant="destructive"
          size="icon"
          className="size-8 cursor-pointer"
          disabled={disabled || isPending}
          title="Delete user"
          aria-label={`Delete ${userName}`}
        >
          <Trash2 className="size-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete User?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">{userName}</span>?
            Please confirm that you want to continue with this action.
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
                Deleting...
              </>
            ) : (
              "Confirm Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
