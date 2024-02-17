import { Metadata } from "next";

import { Section } from "@/components/Section";
import { StudentCard } from "@/components/StudentCard";

import { getStudents } from "@/services/getStudents";
import { serif } from "../fonts";

export const metadata: Metadata = {
  title: "Abacus | Students",
};

export default async function StudentsPage() {
  const students = await getStudents();

  return (
    <Section>
      <header>
        <h1 className={`p-2 text-2xl font-bold ${serif.className}`}>
          All Students
        </h1>
      </header>

      <ul>
        {students?.formatted?.map((student) => (
          <li key={student.studentID}>
            <StudentCard student={student} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
