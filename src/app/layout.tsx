import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NProgressDoneComponent from "@/components/nprogress/NProgressDoneComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geveo Tech Talks Social Media App",
  description: "Social media app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer theme="light" />
        <NProgressDoneComponent />
        {children}
      </body>
    </html>
  );
}
