import { serif } from "@/app/fonts";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { getStudent } from "@/services/getStudent";
import Link from "next/link";

interface Assignment {
  assignmentID: string;
  classID: string;
  label: string;
  classLabel: string;
  score: number;
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
        <span className="font-semibold">{assignment?.score}</span>
        {"%"}
      </span>
    </Link>
  );
};

export default async function StudentPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getStudent(params.id);
  const student = data?.[0];
  const grades = student?.grades;

  return (
    <Section>
      <header className="flex justify-between">
        <h1 className={`p-2 text-2xl font-bold ${serif.className}`}>
          {student?.name}
        </h1>
        <div className="flex gap-1 text-xl">
          <span>GPA:</span>
          <span className="font-bold">{student?.avg}</span>
        </div>
      </header>

      {grades?.map((subject: any) => (
        <Card heading={subject.label} key={subject.label}>
          <ul className="flex w-full flex-col gap-2">
            {subject.classGrades.map((assignment: Assignment) => (
              <li key={assignment.assignmentID}>
                <AssignmentCard assignment={assignment} />
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </Section>
  );
}
