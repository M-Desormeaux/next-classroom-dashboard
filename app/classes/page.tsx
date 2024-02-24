import { Metadata } from "next";

import { Section } from "@/components/Section";

import { serif } from "../fonts";

export const metadata: Metadata = {
  title: "Abacus | Classes",
};

export default async function ClassesPage() {
  const classes = [
    { id: 1, name: "science" },
    { id: 2, name: "english" },
    { id: 1, name: "math" },
    { id: 1, name: "history" },
  ];

  return (
    <Section>
      <header>
        <h1 className={`p-2 text-2xl font-bold ${serif.className}`}>
          All Classes
        </h1>
      </header>

      <ul>
        {classes?.map((a: { id: number; name: string }) => (
          <li key={a?.id}>{a?.name}</li>
        ))}
      </ul>
    </Section>
  );
}
