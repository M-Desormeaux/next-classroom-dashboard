"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ROUTES = [
  { label: "Home", href: "/" },
  { label: "Students", href: "/students" },
  { label: "Assignments", href: "/assignments" },
];

export const Navbar = () => {
  const path = usePathname();

  return (
    <nav className="w-full bg-white max-w-4xl rounded-b drop-shadow">
      <ul className="flex gap-3 p-4">
        {ROUTES.map((route) => {
          const isActive = route.href === path;

          return (
            <li key={route.label}>
              <Link
                href={route.href}
                className={`text-lg font-semibold text-gray-950 hover:text-gray-500 ${isActive ? "underline underline-offset-2" : ""}`}
              >
                {route.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
