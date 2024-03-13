import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { getAssignmentsInClass } from "@/services/getAssignmentsInClass";
import { getClassData } from "@/services/getClassData";
import Link from "next/link";

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
        <span className="font-semibold">{assignment?.avg.toFixed(2)}</span>
        {"%"}
      </span>
    </Link>
  );
};

export default async function ClassPage({
  params,
}: {
  params: { id: string };
}) {
  const classData = await getClassData(params.id);
  const assignments = await getAssignmentsInClass(params.id);

  return (
    <Section>
      {/* <pre>{JSON.stringify(classData, null, 2)}</pre> */}
      <Card heading={classData?.[0].label}>
        <div className="flex justify-between">
          <div>
            <h2 className="text-sm font-bold">Teacher:</h2>
            <span className="text-lg">{classData?.[0]?.teacher}</span>
          </div>
          <div className="flex gap-2">
            <div>
              <h2 className="text-center text-sm font-bold">Start</h2>
              <span className="text-lg">{classData?.[0]?.start}</span>
            </div>
            <div>
              <h2 className="text-center text-sm font-bold">End</h2>
              <span className="text-lg">{classData?.[0]?.end}</span>
            </div>
          </div>
        </div>
      </Card>
      <Card heading="Class Assignments">
        <ul className="flex w-full flex-col gap-2">
          {assignments?.map((assignment) => (
            <li key={assignment.assignmentID}>
              <AssignmentCard assignment={assignment} />
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}
