"use client";

import { logOut } from "@/app/login/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ROUTES = [
  { label: "Home", href: "/" },
  { label: "Classes", href: "/classes" },
  { label: "Students", href: "/students" },
  { label: "Assignments", href: "/assignments" },
];

export const Navbar = () => {
  const path = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full max-w-4xl rounded-b bg-white drop-shadow">
      <ul className="flex items-center gap-3 overflow-x-auto p-4">
        {ROUTES.map((route) => {
          const isActive = route.href === path;

          return (
            <li key={route.label}>
              <Link
                href={route.href}
                className={`text-lg text-gray-950 hover:text-gray-500 hover:underline ${isActive ? "font-semibold underline underline-offset-2" : ""}`}
              >
                {route.label}
              </Link>
            </li>
          );
        })}

        <div className="flex-grow "></div>

        <li key="sign out">
          <button
            className="rounded bg-red-200 px-2 py-1"
            onClick={async () => await logOut()}
          >
            Log Out
          </button>
        </li>
      </ul>
      {/* 
      //! TODO resolve mobile header with login!
      ?? HeadlessUI Menu component?
      */}
    </nav>
  );
};
