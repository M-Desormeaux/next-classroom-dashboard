"use client";

import { sans, serif } from "./fonts";

// Error components must use client

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={sans.className}>
      <body className="flex min-h-svh flex-col items-center">
        <main className="flex min-h-lvh items-center px-10">
          <div className="rounded border-2 border-red-600 bg-red-50 px-6 py-4">
            <h1 className={`text-xl font-bold ${serif.className}`}>
              Woah, something Critical happened.
            </h1>
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
