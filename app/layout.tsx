import { Metadata } from "next";

import { Navbar } from "@/components/Navbar";

import "./globals.css";
import { sans } from "./fonts";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Abacus",
  description: "Grade management simplified.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // throw new Error("This error is a test");

  return (
    <html lang="en" className={sans.className}>
      <body className="flex min-h-svh w-full flex-col items-center gap-5">
        <Navbar />
        <main className="flex h-full w-full max-w-4xl flex-grow flex-col rounded-t bg-white drop-shadow">
          {children}
        </main>
      </body>
    </html>
  );
}
