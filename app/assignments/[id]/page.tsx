import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { getAssignment } from "@/services/getAssignment";
import Link from "next/link";

interface Assignment {
  assignmentID: string;
  classID: string;
  studentID: string;
  name: string;
  classLabel: string;
  score: number;
}

const AssignmentCard = ({ assignment }: { assignment: Assignment }) => {
  return (
    <div className="flex w-full flex-grow flex-col gap-1 rounded p-3 xs:flex-row xs:items-center xs:justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {assignment?.name}
        </h3>
      </div>
      <span>
        {"Score: "}
        <span className="font-semibold">{assignment?.score?.toFixed(0)}</span>
        {"%"}
      </span>
    </div>
  );
};

export default async function AssignmentPage({
  params,
}: {
  params: { id: string };
}) {
  const assignments = await getAssignment(params.id);
  const assignment = assignments?.[0];

  return (
    <Section>
      <Card heading={assignment?.label}>
        <div className="flex justify-between">
          <div>
            <h2 className="text-sm font-bold">Teacher:</h2>
            <span className="text-lg">{assignment?.teacher}</span>
          </div>
          <div className="flex items-center gap-1">
            <h2 className="text-center text-sm">Avg</h2>
            <span className="text-lg font-bold">
              {assignment?.avg?.toFixed(2)}%
            </span>
          </div>
        </div>
      </Card>
      <Card heading="Assignment Grades">
        <ul className="flex w-full flex-col gap-2">
          {assignment?.grades?.map((grade) => (
            <li key={grade.assignmentID}>
              <AssignmentCard assignment={grade} />
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}
