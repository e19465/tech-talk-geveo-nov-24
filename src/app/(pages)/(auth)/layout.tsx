import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media App Authentication",
  description: "Social media app built with Next.js",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full min-h-[100vh] flex items-center justify-center">
      {children}
    </section>
  );
}
