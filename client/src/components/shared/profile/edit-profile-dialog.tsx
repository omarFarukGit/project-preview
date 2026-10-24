"use client";

import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Pencil } from "lucide-react";
import { z } from "zod";

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
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { EditProfileDialogProps, profileFields } from "@/types/user.types";
import { updateProfileSchema } from "@/validation/user.validation";

export default function EditProfileDialog({
  user,
  isPending = false,
  onSubmit,
}: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const form = useForm({
    defaultValues: {
      name: user.name ?? "",
      bio: user.bio ?? "",
      phone: user.phone ?? "",
      country: user.country ?? "",
      city: user.city ?? "",
      address: user.address ?? "",
      githubUrl: user.githubUrl ?? "",
      linkedinUrl: user.linkedinUrl ?? "",
      portfolioUrl: user.portfolioUrl ?? "",
    },

    validators: {
      onChange: updateProfileSchema,
      onBlur: updateProfileSchema,
      onSubmit: updateProfileSchema,
    },

    onSubmit: async ({ value }) => {
      await onSubmit({
        name: value.name.trim(),
        bio: value.bio.trim(),
        phone: value.phone.trim(),
        country: value.country.trim(),
        city: value.city.trim(),
        address: value.address.trim(),
        githubUrl: value.githubUrl.trim(),
        linkedinUrl: value.linkedinUrl.trim(),
        portfolioUrl: value.portfolioUrl.trim(),
      });

      setOpen(false);
    },
  });

  useEffect(() => {
    if (open) {
      setSubmitAttempted(false);

      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isPending) {
          setOpen(nextOpen);
        }
      }}
    >
      <DialogTrigger>
        <Button
          className={"cursor-pointer"}
          type="button"
          variant="outline"
          size="sm"
          disabled={isPending}
        >
          <Pencil className="mr-2 size-4" />
          Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>

          <DialogDescription>
            Update your personal information and social profiles.
          </DialogDescription>
        </DialogHeader>

        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();

            setSubmitAttempted(true);

            void form.handleSubmit();
          }}
        >
          <FieldGroup>
            {profileFields.map((item) => (
              <form.Field key={item.name} name={item.name}>
                {(field) => {
                  const isInvalid =
                    (field.state.meta.isTouched || submitAttempted) &&
                    field.state.meta.errors.length > 0;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>{item.label}</FieldLabel>

                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        onBlur={field.handleBlur}
                        placeholder={item.placeholder}
                        maxLength={item.maxLength}
                        disabled={isPending}
                        aria-invalid={isInvalid}
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            ))}
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button
              className={"cursor-pointer"}
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button
              className={" cursor-pointer"}
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
