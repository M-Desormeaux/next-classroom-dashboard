"use client";

import { GeistSans } from "geist/font/sans";

// Error components must use client

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="flex flex-col items-center min-h-svh">
        <main className="min-h-lvh flex items-center px-10">
          <div className="border-red-600 border-2 px-6 py-4 bg-red-50 rounded">
            <h2 className="font-bold text-xl">
              Woah, something Critical happened.
            </h2>
            <p>
              I apologize for the inconvenience and I am, likely, fixing this as
              we speak.
            </p>
            {/* <button onClick={() => reset()}>Try again</button> */}
          </div>
        </main>
      </body>
    </html>
  );
}
