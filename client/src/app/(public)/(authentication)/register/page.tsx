
import { RegisterForm } from "@/components/form/register-form";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Create Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Register to get started with ProjectPreview
          </p>
        </div>

        <RegisterForm />

        <div className="flex items-center justify-center">
          <p className="text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#079B83] hover:underline dark:text-[#55D9C0]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
