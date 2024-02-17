import { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/Section";

import { getAssignments } from "@/services/getAssignments";
import { serif } from "../fonts";

export const metadata: Metadata = {
  title: "Abacus | Assignments",
};

interface Assignment {
  assignmentID: string;
  classID: string;
  label: string;
  classLabel: string;
  grades: number[];
  min: number;
  max: number;
  difference: number;
  avg: number;
}

const AssignmentCard = ({ assignment }: { assignment: Assignment }) => {
  const classesLabel = assignment?.classLabel ?? "unknown";

  return (
    <Link
      href={`/students/${assignment.assignmentID}`}
      className="group flex w-full items-center justify-between gap-1 rounded p-3 hover:bg-gray-100 hover:shadow active:shadow-sm"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:underline group-focus-visible:underline">
          {assignment?.label}
        </h3>
        <span className="text-gray-800">{classesLabel}</span>
      </div>
      <span>
        {"Avg: "}
        <span className="font-semibold">{assignment?.avg.toFixed(1)}</span>
        {"%"}
      </span>
    </Link>
  );
};

export default async function AssignmentsPage() {
  const { formatted: assignments } = await getAssignments();

  return (
    <Section>
      <header>
        <h1 className={`p-2 text-2xl font-bold ${serif.className}`}>
          All Assignments
        </h1>
      </header>
      <ul>
        {assignments?.map((assignment) => (
          <li key={assignment.assignmentID}>
            <AssignmentCard assignment={assignment} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
