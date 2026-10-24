"use client";

import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";



import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useRegistration } from "@/hooks/auth.hook";
import { UserValidation } from "@/validation/auth.validation";

export function RegisterForm() {
  const router = useRouter();
  const { mutate: register, isPending } = useRegistration();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validators: {
      onSubmit: UserValidation.UserRegistrationZodSchema,
    },

    onSubmit: ({ value }) => {
      register(
        {
          name: value.name.trim(),
          email: value.email.trim().toLowerCase(),
          password: value.password,
        },
        {
          onSuccess: (res) => {
            if (res.success) {
              toast.add({
                title: "Registration successful",
                description: "Your account has been created successfully.",
                type: "success",
              });

              router.push("/login");
            } else {
              toast.add({
                title: "Registration failed",
                description:
                  res.message || "Unable to create your account.",
                type: "error",
              });
            }
          },

          onError: () => {
            toast.add({
              title: "Registration failed",
              description:
                "Please check your information and try again.",
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        {/* Name */}
        <form.Field name="name">
          {(field) => {
            const hasError = field.state.meta.errors.length > 0;

            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={hasError}
                  className={
                    hasError
                      ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />

                {hasError && (
                  <FieldError>
                    {field.state.meta.errors
                      .map((error) =>
                        typeof error === "string"
                          ? error
                          : error?.message,
                      )
                      .filter(Boolean)
                      .join(", ")}
                  </FieldError>
                )}
              </Field>
            );
          }}
        </form.Field>

        {/* Email */}
        <form.Field name="email">
          {(field) => {
            const hasError = field.state.meta.errors.length > 0;

            return (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Email Address
                </FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={hasError}
                  className={
                    hasError
                      ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />

                {hasError && (
                  <FieldError>
                    {field.state.meta.errors
                      .map((error) =>
                        typeof error === "string"
                          ? error
                          : error?.message,
                      )
                      .filter(Boolean)
                      .join(", ")}
                  </FieldError>
                )}
              </Field>
            );
          }}
        </form.Field>

        {/* Password */}
        <form.Field name="password">
          {(field) => {
            const hasError = field.state.meta.errors.length > 0;

            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={hasError}
                    className={`pr-10 ${
                      hasError
                        ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />

                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4 cursor-pointer" />
                    ) : (
                      <Eye className="size-4 cursor-pointer" />
                    )}
                  </button>
                </div>

                {hasError && (
                  <FieldError>
                    {field.state.meta.errors
                      .map((error) =>
                        typeof error === "string"
                          ? error
                          : error?.message,
                      )
                      .filter(Boolean)
                      .join(", ")}
                  </FieldError>
                )}
              </Field>
            );
          }}
        </form.Field>

        {/* Confirm Password */}
        <form.Field name="confirmPassword">
          {(field) => {
            const hasError = field.state.meta.errors.length > 0;

            return (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Confirm Password
                </FieldLabel>

                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={hasError}
                    className={`pr-10 ${
                      hasError
                        ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />

                  <button
                    type="button"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4 cursor-pointer" />
                    ) : (
                      <Eye className="size-4 cursor-pointer" />
                    )}
                  </button>
                </div>

                {hasError && (
                  <FieldError>
                    {field.state.meta.errors
                      .map((error) =>
                        typeof error === "string"
                          ? error
                          : error?.message,
                      )
                      .filter(Boolean)
                      .join(", ")}
                  </FieldError>
                )}
              </Field>
            );
          }}
        </form.Field>

        {/* Submit */}
        <Button  type="submit" className="w-full cursor-pointer" disabled={isPending}>
          {isPending ? "Creating account..." : "Create Account"}
        </Button>
      </FieldGroup>
    </form>
  );
}
