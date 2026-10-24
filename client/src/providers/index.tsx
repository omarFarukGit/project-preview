import type { ReactNode } from "react";
import QueryPoviders from "./query.provider";
import { ThemeProvider } from "@/components/ui/theme-provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryPoviders>{children}</QueryPoviders>
    </ThemeProvider>
  );
}
