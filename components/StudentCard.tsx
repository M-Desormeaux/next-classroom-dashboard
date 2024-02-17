import Link from "next/link";

interface Props {
  student:
    | {
        studentID: string;
        name: string;
        avg: number;
        classes: string[];
      }
    | undefined;
}

export const StudentCard = ({ student }: Props) => {
  const classesLabel = student?.classes.join(", ") ?? "unknown";

  return (
    <Link
      href={`/students/${student?.studentID}`}
      className="group flex w-full flex-grow items-center justify-between gap-1 rounded p-3 hover:bg-gray-100 hover:shadow active:shadow-sm"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:underline group-focus-visible:underline">
          {student?.name}
        </h3>
        <span className="text-gray-800">{classesLabel}</span>
      </div>
      <span>
        {"Avg: "}
        <span className="font-semibold">{student?.avg}</span>
        {"%"}
      </span>
    </Link>
  );
};
