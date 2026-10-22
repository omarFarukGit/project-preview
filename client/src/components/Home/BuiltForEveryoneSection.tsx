"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const audiences = [
  {
    icon: GraduationCap,
    number: "01",
    title: "For Students",
    subtitle: "Turn your projects into progress.",
    description:
      "Keep your work organized, share your projects for review, and use mentor feedback to identify opportunities to improve.",
    benefits: [
      "Submit projects with repository and live links",
      "Track approval and review status",
      "Learn from constructive feedback",
    ],
    cta: "Start as a Student",
    href: "/register",
  },
  {
    icon: UsersRound,
    number: "02",
    title: "For Mentors",
    subtitle: "Help developers grow with feedback.",
    description:
      "Review project submissions through a dedicated workspace and help students move forward with clear, useful feedback.",
    benefits: [
      "Access a dedicated review dashboard",
      "Evaluate student project submissions",
      "Share feedback and review decisions",
    ],
    cta: "Mentor Sign In",
    href: "/login",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "For Administrators",
    subtitle: "Keep the platform running smoothly.",
    description:
      "Manage users and oversee the platform's review process through role-specific administrative tools.",
    benefits: [
      "Manage platform users",
      "Oversee project submissions",
      "Maintain organized access and workflows",
    ],
    cta: "Admin Sign In",
    href: "/login",
  },
];

export function BuiltForEveryoneSection() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-primary">
            <UsersRound className="size-4" />
            One Platform, Different Roles
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Built for Everyone in the{" "}
            <span className="text-primary">Review Process</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            Whether you're submitting a project, reviewing someone's work, or
            managing the platform, ProjectReview gives you a workspace for your role.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3">
          {audiences.map((audience) => {
            const Icon = audience.icon;

            return (
              <article
                key={audience.number}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-7" />
                  </div>

                  <span className="text-4xl font-bold text-muted-foreground/20">
                    {audience.number}
                  </span>
                </div>

                <h3 className="mt-7 text-2xl font-semibold text-foreground">
                  {audience.title}
                </h3>

                <p className="mt-2 font-medium text-primary">
                  {audience.subtitle}
                </p>

                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  {audience.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {audience.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-sm leading-6 text-foreground/80"
                    >
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Button
                    variant="outline"
                    className="group/button w-full rounded-xl"
                    render={<Link href={audience.href} />}
                  >
                    {audience.cta}
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover/button:translate-x-1" />
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}