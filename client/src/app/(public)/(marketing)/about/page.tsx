import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Code2,
  GraduationCap,
  Lightbulb,
  MessageSquareText,
  ShieldCheck,
  Target,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Target,
    title: "Purposeful Learning",
    description:
      "Build practical projects and use structured reviews to identify what you can improve next.",
  },
  {
    icon: MessageSquareText,
    title: "Constructive Feedback",
    description:
      "Make project reviews more meaningful with clear feedback and actionable suggestions.",
  },
  {
    icon: UsersRound,
    title: "Collaborative Growth",
    description:
      "Connect student work with mentor guidance through an organized project review workflow.",
  },
];

const audiences = [
  {
    icon: GraduationCap,
    title: "Students",
    description:
      "Submit projects, share your work, monitor review status, and learn from mentor feedback.",
  },
  {
    icon: BookOpenCheck,
    title: "Mentors",
    description:
      "Review submissions, assess project work, and guide students with constructive feedback.",
  },
  {
    icon: ShieldCheck,
    title: "Administrators",
    description:
      "Manage users and oversee the platform through dedicated administrative tools.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-background">
      {/* Hero */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="pointer-events-none absolute -right-24 -top-20 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:36px_36px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-primary">
            <Code2 className="size-4" />
            About ProjectReview
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Every Project Is an Opportunity to{" "}
            <span className="text-primary">Grow.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            ProjectReview is a project submission and review platform designed
            to help students showcase their work, receive mentor feedback, and
            make continuous progress through practical learning.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="rounded-xl"
              render={<Link href="/register" />}
            >
              Start Your Journey
              <ArrowRight className="ml-2 size-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-xl"
              render={<Link href="/how-it-works" />}
            >
              How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-y border-border bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <Target className="size-4" />
              Our Mission
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Turning Project Work Into Meaningful Progress
            </h2>

            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Building a project is an important part of learning software
              development. But understanding what works, what needs improvement,
              and how to move forward is just as important.
            </p>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              ProjectReview brings project submissions, review decisions, and
              mentor feedback together in one organized place, helping students
              learn from the work they create.
            </p>
          </div>

          <div className="relative rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="absolute right-6 top-6 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Lightbulb className="size-6" />
            </div>

            <p className="text-sm font-medium text-muted-foreground">
              What We Believe
            </p>

            <h3 className="mt-12 text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
              Learning doesn't stop when the code runs.
            </h3>

            <p className="mt-4 leading-7 text-muted-foreground">
              Reflection, feedback, and iteration help turn completed projects
              into opportunities for improvement.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Build something practical",
                "Learn from review and feedback",
                "Improve with every iteration",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-primary" />
                  <span className="text-sm text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold text-primary">
              What Guides Us
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built Around Better Learning
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              The principles behind a more organized and feedback-driven
              project review experience.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg sm:p-7"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-foreground">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-y border-border bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold text-primary">
              Who It's For
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              One Platform, Three Roles
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Each role has a distinct responsibility in the project review
              process.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {audiences.map((audience) => {
              const Icon = audience.icon;

              return (
                <article
                  key={audience.title}
                  className="rounded-2xl border border-border bg-card p-6 sm:p-7"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-foreground">
                    {audience.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {audience.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl bg-foreground px-6 py-10 text-center sm:px-10 sm:py-12">
          <h2 className="text-2xl font-bold tracking-tight text-background sm:text-3xl">
            Ready to Share What You've Built?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-background/70 sm:text-base">
            Create your student account and take the next step in your project
            review journey.
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