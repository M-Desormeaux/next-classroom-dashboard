import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";

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
    <html lang="en" className={GeistSans.className}>
      <body className="flex flex-col items-center min-h-svh">
        <Navbar />
        <main className="h-full flex flex-col items-center bg-white w-full max-w-4xl flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
