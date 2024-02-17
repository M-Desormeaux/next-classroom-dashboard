import Link from "next/link";
import { serif } from "./layout";

export default function NotFound() {
  return (
    <div className="flex flex-grow flex-col items-center gap-3 px-4 py-8">
      <h1 className={`p-2 text-2xl font-bold ${serif.className}`}>
        Page Not Found
      </h1>
      <p>It seems we could not find what you were looking for.</p>
      <Link
        href="/"
        className="rounded border border-gray-100 bg-gray-100 p-3 shadow-sm hover:shadow active:shadow-sm"
      >
        Return Home
      </Link>
    </div>
  );
}
