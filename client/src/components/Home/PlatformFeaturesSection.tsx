"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesCombined,
  CheckCircle2,
  FileCode2,
  LayoutDashboard,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: FileCode2,
    title: "Easy Project Submission",
    description:
      "Submit your project with its name, description, GitHub repository, and live demo link in one simple workflow.",
    label: "For Students",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Progress Tracking",
    description:
      "Keep track of your submissions and see whether each project is pending, approved, or rejected.",
    label: "Stay Organized",
  },
  {
    icon: MessageSquareText,
    title: "Meaningful Mentor Feedback",
    description:
      "Get constructive feedback from mentors and understand what to improve in your next iteration.",
    label: "Keep Improving",
  },
  {
    icon: LayoutDashboard,
    title: "Dedicated Dashboards",
    description:
      "Access a focused workspace designed around the tasks and responsibilities of your role.",
    label: "One Platform",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access",
    description:
      "Separate student, mentor, and administrator capabilities help keep platform workflows organized.",
    label: "Access Control",
  },
  {
    icon: Sparkles,
    title: "A Clear Review Workflow",
    description:
      "Follow your project from submission through mentor review and use feedback to keep learning.",
    label: "Learn by Doing",
  },
];

export function PlatformFeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-muted/30 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="size-4" />
            Everything in One Place
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Tools to Help You{" "}
            <span className="text-primary">Build Better Projects</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            From submitting your work to receiving expert feedback,
            ProjectReview keeps your project review journey simple and
            organized.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" />
                  </div>

                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {feature.label}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold text-foreground sm:text-xl">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
                  <CheckCircle2 className="size-4" />
                  <span>Designed for your workflow</span>
                </div>

                {/* Subtle decorative index */}
                <span className="pointer-events-none absolute -bottom-8 -right-1 text-8xl font-bold text-primary/[0.04]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center sm:mt-14">
          <p className="text-sm text-muted-foreground sm:text-base">
            Have a project ready to share?
          </p>

          <Button
            nativeButton={false}
            size="lg"
            className="group rounded-xl px-6"
            render={<Link href="/register" />}
          >
            Join ProjectReview
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
