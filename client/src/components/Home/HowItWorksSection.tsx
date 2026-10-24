"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  FileCode2,
  MessageSquareText,
  UserRoundPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Sign up as a student and access your personal dashboard to organize and manage your projects.",
    icon: UserRoundPlus,
    points: ["Quick registration", "Personal dashboard"],
  },
  {
    number: "02",
    title: "Submit Your Project",
    description:
      "Share your project name, description, GitHub repository, and live demo link for mentor review.",
    icon: FileCode2,
    points: ["Add project details", "Track submission status"],
  },
  {
    number: "03",
    title: "Get Feedback & Improve",
    description:
      "Receive mentor feedback, check your review status, and use the suggestions to improve your work.",
    icon: MessageSquareText,
    points: ["Mentor review", "Actionable feedback"],
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-primary">
            <CheckCircle2 className="size-4" />
            Simple Process
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            How ProjectReview Works
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            From your first submission to meaningful mentor feedback, everything
            you need to move forward is in one place.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14 grid gap-6 md:grid-cols-3 md:gap-5 lg:mt-16">
          {/* Decorative connector for desktop */}
          <div className="absolute left-[20%] right-[20%] top-12 hidden border-t-2 border-dashed border-border md:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-8"
              >
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-7" />
                  </div>

                  <span className="text-4xl font-bold tracking-tight text-muted-foreground/20">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  {step.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {step.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <CheckCircle2 className="size-4 shrink-0 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>

                {step.number !== "03" && (
                  <ArrowDown className="mx-auto mt-6 size-5 text-muted-foreground/40 md:hidden" />
                )}
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center sm:mt-14">
          <p className="text-sm text-muted-foreground sm:text-base">
            Ready to share your work and grow your skills?
          </p>

          <Button
            nativeButton={false}
            size="lg"
            className="group rounded-xl px-6"
            render={<Link href="/register" />}
          >
            Get Started Today
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
