import Navbar from "@/components/common/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media App",
  description: "Social media app built with Next.js",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col h-[100vh]">
      <Navbar />
      <div className="w-full h-[calc(100vh-70px)] overflow-auto bg-slate-100">
        {children}
      </div>
    </section>
  );
}
