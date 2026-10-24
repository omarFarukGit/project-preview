import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" container mx-auto ">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
