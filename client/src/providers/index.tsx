import type { ReactNode } from "react";
import QueryPoviders from "./query.provider";

export default function Providers({ children }: { children: ReactNode }) {
  return <QueryPoviders>{children}</QueryPoviders>;
}
