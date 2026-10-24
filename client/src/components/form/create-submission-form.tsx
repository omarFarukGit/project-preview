"use client";

import { useForm } from "@tanstack/react-form";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useCreateSubmissions } from "@/hooks/submissions.hook";
import { createSubmissionSchema } from "@/validation/submissions.validation";
import { FaGithub } from "react-icons/fa";
import { TbWorldUp } from "react-icons/tb";

export function CreateSubmissionForm() {
  const router = useRouter();

  const { mutate: createSubmission, isPending } = useCreateSubmissions();

  const form = useForm({
    defaultValues: {
      projectName: "",
      repoUrl: "",
      liveUrl: "",
      description: "",
    },

    validators: {
      onSubmit: createSubmissionSchema,
    },

    onSubmit: ({ value }) => {
      createSubmission(value, {
        onSuccess: (res) => {
          if (res.success) {
            toast.add({
              title: "Submission Created",
              description: "Your project has been submitted successfully.",
              type: "success",
            });

            router.push("/student-dashboard/submissions");
          }
        },
        onError: (error) => {
          const apiError = error as {
            data?: { message?: string };
            response?: {
              _data?: { message?: string };
              data?: { message?: string };
            };
            message?: string;
          };

          const message =
            apiError.data?.message ??
            apiError.response?._data?.message ??
            apiError.response?.data?.message ??
            apiError.message ??
            "Unable to create submission.";

          toast.add({
            title: "Submission Failed",
            description: message,
            type: "error",
          });
        },
      });
    },
  });

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Create Submission</CardTitle>

        <CardDescription>
          Submit your project for review. Provide your project details, GitHub
          repository, and live URL.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Project Name */}
            <form.Field name="projectName">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Project Name</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="e.g. RentNest"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                    />

                    <FieldDescription>
                      Enter a name between 3 and 100 characters.
                    </FieldDescription>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Repository URL */}
            <form.Field name="repoUrl">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      <FaGithub className="mr-2 inline size-4" />
                      GitHub Repository URL
                    </FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="url"
                      placeholder="https://github.com/username/repository"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                    />

                    <FieldDescription>
                      Provide a valid HTTPS GitHub repository URL.
                    </FieldDescription>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Live URL */}
            <form.Field name="liveUrl">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      <TbWorldUp className="mr-2 inline size-4" />
                      Live Project URL
                    </FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="url"
                      placeholder="https://your-project.vercel.app"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                    />

                    <FieldDescription>
                      Your deployed project URL must use HTTPS.
                    </FieldDescription>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Project Description
                    </FieldLabel>

                    <Textarea
                      id={field.name}
                      name={field.name}
                      placeholder="Describe your project, features, and user roles..."
                      rows={6}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      className="min-h-32 resize-y"
                    />

                    <FieldDescription>
                      {field.state.value.length}/2000 characters
                    </FieldDescription>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Submit */}
            <Field>
              <Button
                disabled={isPending}
                type="submit"
                className="w-full cursor-pointer"
              >
                {isPending ? (
                  <>
                    <Spinner />
                    Creating Submission...
                  </>
                ) : (
                  <>
                    <Send className="size-4 " />
                    Create Submission
                  </>
                )}
              </Button>

              <FieldDescription className="text-center">
                Please verify that your repository and live project URLs are
                correct before submitting.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
