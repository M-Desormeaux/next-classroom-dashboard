import { Metadata } from "next";

import { Navbar } from "@/components/Navbar";

import "./globals.css";
import { sans } from "./fonts";
import { hasAuth } from "@/hooks/hasAuth";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Abacus",
  description: "Grade management simplified.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // throw new Error("This error is a test");

  const auth = await hasAuth();

  return (
    <html lang="en" className={sans.className}>
      <body className="flex min-h-svh w-full flex-col items-center gap-5">
        {auth && <Navbar />}
        <main
          className={
            "flex h-full w-full max-w-4xl flex-grow flex-col bg-white drop-shadow " +
            (auth ? "rounded-t" : "")
          }
        >
          {children}
        </main>
      </body>
    </html>
  );
}
