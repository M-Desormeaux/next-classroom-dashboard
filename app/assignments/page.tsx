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
      href={`/assignments/${assignment.assignmentID}`}
      className="group flex w-full flex-grow flex-col gap-1 rounded border p-3 hover:bg-gray-100 hover:shadow active:shadow-sm xs:flex-row xs:items-center xs:justify-between"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:underline group-focus-visible:underline">
          {assignment?.label}
        </h3>
        <span className="text-gray-800">{classesLabel}</span>
      </div>
      <span>
        {"Avg: "}
        <span className="font-semibold">{assignment?.avg?.toFixed(2)}</span>
        {"%"}
      </span>
    </Link>
  );
};

export default async function AssignmentsPage() {
  const assignments = await getAssignments();

  return (
    <Section>
      <header>
        <h1 className={`p-2 text-2xl font-bold ${serif.className}`}>
          All Assignments
        </h1>
      </header>
      <ul className="flex w-full flex-col gap-2">
        {assignments?.map((assignment) => (
          <li key={assignment.assignmentID}>
            <AssignmentCard assignment={assignment} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
