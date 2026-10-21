import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ProjectReview",
  description: "ProjectReview is a full-stack project submission and review platform where students can submit their projects for evaluation, track submission status, and receive mentor feedback. Mentors can review submissions, approve or reject projects, and manage the review process through a dashboard with role-based access control.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"> <Providers>
          {children}
        </Providers></body>
    </html>
  );
}
