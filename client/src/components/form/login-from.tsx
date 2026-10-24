"use client";

import { useForm } from "@tanstack/react-form";
import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";
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
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { useLogin } from "@/hooks/auth.hook";
import { UserValidation } from "@/validation/auth.validation";
import { demoCredentials, DemoRole } from "@/types/auth.types";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutate: login, isPending: loginPending } = useLogin();
  const [activeDemo, setActiveDemo] = useState<DemoRole>();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmit: UserValidation.UserLoginZodSchema,
    },

    onSubmit: ({ value }) => {
      login(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: (res) => {
            if (res.success) {
              toast.add({
                title: "Login successful",
                description: "Welcome back!",
                type: "success",
              });
              const role = res.data?.user?.role;
              if (role === "ADMIN") router.push("/admin-dashboard");
              else if (role === "STUDENT") router.push("/student-dashboard");
              else if (role === "MENTOR") router.push("/mentor-dashboard");
            }
          },

          onError: () => {
            toast.add({
              title: "Login failed",
              description: "Invalid email or password",
              type: "error",
            });
          },
        },
      );
    },
  });

  const handleDemoLogin = (role: DemoRole) => {
    const credential = demoCredentials[role];

    setActiveDemo(role);
    form.setFieldValue("email", credential.email);
    form.setFieldValue("password", credential.password);
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      {/* Demo Login */}
      <div className="mb-6 space-y-3">
        <p className="text-center text-sm text-muted-foreground">
          Quick Demo Login
        </p>

        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(demoCredentials) as DemoRole[]).map((role) => (
            <Button
              key={role}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleDemoLogin(role)}
              className={cn(
                "cursor-pointer rounded-lg",
                activeDemo === role &&
                  "border-[#00B89C] bg-[#E1F8F3] text-[#087F6B] hover:bg-[#D2F3EA] dark:bg-[#163A35] dark:text-[#75E5CF] dark:hover:bg-[#1B4941]",
              )}
            >
              {demoCredentials[role].label}
            </Button>
          ))}
        </div>
      </div>

      {/* Login Form */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-5">
          {/* Email */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="gap-2">
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="Enter your Email"
                    autoComplete="email"
                    value={field.state.value}
                    onChange={(event) => {
                      const email = event.target.value;
                      field.handleChange(email);

                      const matchingRole = (
                        Object.keys(demoCredentials) as DemoRole[]
                      ).find((role) => demoCredentials[role].email === email);

                      if (matchingRole) setActiveDemo(matchingRole);
                    }}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    className="h-10 rounded-lg focus-visible:ring-[#00B89C]/40"
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="gap-2">
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      className="h-10 rounded-lg pr-10 focus-visible:ring-[#00B89C]/40"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((previous) => !previous)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeClosed className="size-4 cursor-pointer" />
                      ) : (
                        <Eye className="size-4 cursor-pointer" />
                      )}
                    </button>
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={loginPending}
            className="h-10 w-full cursor-pointer rounded-lg bg-[#00B89C] font-semibold text-[#10192D] hover:bg-[#00A88F] disabled:opacity-60"
          >
            {loginPending ? (
              <>
                <Spinner />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
