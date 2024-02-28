import { Metadata } from "next";

import { Section } from "@/components/Section";

import { serif } from "../fonts";

import { getClasses } from "@/services/getClasses";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Abacus | Classes",
};

export default async function ClassesPage() {
  const data = await getClasses();

  return (
    <Section>
      <header>
        <h1 className={`p-2 text-2xl font-bold ${serif.className}`}>
          All Classes
        </h1>
      </header>

      <ul className="flex w-full flex-col gap-2">
        {data?.map(
          (a: {
            classID: number;
            label: string;
            start: string;
            end: string;
          }) => (
            <li key={a?.classID}>
              <Link
                href={`/students/${a?.classID}`}
                className="xs:justify-between xs:items-center xs:flex-row group flex w-full flex-grow flex-col gap-1 rounded border p-3 hover:bg-gray-100 hover:shadow active:shadow-sm"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:underline group-focus-visible:underline">
                    {a?.label}
                  </h3>
                </div>
                <div>
                  {a?.start} to {a?.end}
                </div>
              </Link>
            </li>
          ),
        )}
      </ul>
    </Section>
  );
}
