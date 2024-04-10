"use client";

import { sans, serif } from "../fonts";

// Error components must use client

export default function GlobalError() {
  return (
    <main className="flex min-h-lvh items-center px-10">
      <div className="rounded border-2 border-red-600 bg-red-50 px-6 py-4">
        <h1 className={`text-xl font-bold ${serif.className}`}>
          Woah, something Critical happened.
        </h1>
        <p>
          I apologize for the inconvenience and I am, likely, fixing this as we
          speak.
        </p>
        {/* <button onClick={() => reset()}>Try again</button> */}
      </div>
    </main>
  );
}
