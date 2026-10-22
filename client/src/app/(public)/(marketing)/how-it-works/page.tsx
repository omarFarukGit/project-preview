import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileCode2,
  GraduationCap,
  LayoutDashboard,
  MessageSquareText,
  ShieldCheck,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: UserRoundPlus,
    title: "Create Your Student Account",
    description:
      "Get started by creating your student account. Once registered and signed in, you can access your personal dashboard and manage your project submissions.",
    details: [
      "Register with your account information",
      "Sign in to access your dashboard",
      "Keep your projects organized in one place",
    ],
    badge: "Getting Started",
  },
  {
    number: "02",
    icon: FileCode2,
    title: "Submit Your Project",
    description:
      "Share a project you have built and want reviewed. Provide the project information that helps a mentor understand your work.",
    details: [
      "Add your project name and description",
      "Include your GitHub repository URL",
      "Provide a live demo URL when available",
    ],
    badge: "Student Dashboard",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Get Your Project Reviewed",
    description:
      "Your submission enters the review workflow. An authorized mentor can inspect the project and update its review status according to the platform's process.",
    details: [
      "Keep track of your submission status",
      "Wait for the mentor's review decision",
      "Check for feedback when it is available",
    ],
    badge: "Review Process",
  },
  {
    number: "04",
    icon: MessageSquareText,
    title: "Learn, Improve, and Repeat",
    description:
      "Use the review outcome and any available mentor feedback to understand what went well and what you could improve in future iterations.",
    details: [
      "Read the feedback provided for your project",
      "Identify areas that need improvement",
      "Apply what you learn to your next project",
    ],
    badge: "Continuous Learning",
  },
];

const roles = [
  {
    icon: GraduationCap,
    title: "Student",
    description:
      "Submit projects, monitor review status, and learn from mentor feedback.",
  },
  {
    icon: UsersRound,
    title: "Mentor",
    description:
      "Review assigned or available submissions and provide review decisions and feedback.",
  },
  {
    icon: ShieldCheck,
    title: "Administrator",
    description:
      "Manage platform users and oversee supported platform workflows.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="overflow-hidden bg-background">
      {/* Hero */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="pointer-events-none absolute -right-20 -top-16 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:36px_36px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-primary">
            <LayoutDashboard className="size-4" />
            How It Works
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            From Project Submission to{" "}
            <span className="text-primary">Real Progress.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            ProjectReview brings project submissions, mentor reviews, and
            feedback together in a simple workflow designed to support
            practical learning.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="rounded-xl"
              render={<Link href="/register" />}
            >
              Create Student Account
              <ArrowRight className="ml-2 size-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-xl"
              render={<Link href="/login" />}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-y border-border bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-primary">
              The Process
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Four Steps to Get Started
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Follow the process from creating your account to learning from
              your project review.
            </p>
          </div>

          <div className="relative mt-12 space-y-5 sm:mt-14">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg sm:p-8"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:gap-7">
                    <div className="flex shrink-0 items-start gap-4 sm:w-24 sm:flex-col sm:items-center">
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="size-7" />
                      </div>

                      <span className="pt-2 text-3xl font-bold tracking-tight text-muted-foreground/30 sm:pt-0 sm:text-4xl">
                        {step.number}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {step.badge}
                      </span>

                      <h3 className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">
                        {step.title}
                      </h3>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                        {step.description}
                      </p>

                      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                        {step.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-start gap-2 text-sm leading-6 text-foreground/80"
                          >
                            <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="absolute -bottom-5 left-1/2 z-10 hidden -translate-x-1/2 rounded-full border border-border bg-background p-1.5 text-muted-foreground md:flex">
                      <ArrowDown className="size-4" />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Role-specific workflows */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-primary">
              Role-Based Experience
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everyone Has a Role to Play
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Each account type has a different responsibility in the project
              submission and review workflow.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {roles.map((role) => {
              const Icon = role.icon;

              return (
                <article
                  key={role.title}
                  className="rounded-2xl border border-border bg-card p-6 sm:p-7"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-foreground">
                    {role.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {role.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-12 pt-4 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl bg-foreground px-6 py-10 text-center sm:px-10 sm:py-12">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <MessageSquareText className="size-6" />
          </div>

          <h2 className="mt-5 text-2xl font-bold tracking-tight text-background sm:text-3xl">
            Your Next Step Starts Here
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-background/70 sm:text-base">
            Create your student account and bring your next project into the
            review process.
          </p>

          <Button
            size="lg"
            className="mt-6 rounded-xl"
            render={<Link href="/register" />}
          >
            Get Started
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </section>
    </main>
  );
}