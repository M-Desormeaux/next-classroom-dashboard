import type { Metadata } from "next";

import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { StudentCard } from "@/components/StudentCard";

import { FormattedAssignment, getAssignments } from "@/services/getAssignments";
import { getStudents } from "@/services/getStudents";

import { getScores } from "@/utils/getScores";
import { serif } from "./fonts";

const CLASS_IDS = ["english", "math", "history", "science"];

export const metadata: Metadata = {
  title: "Abacus | Home",
};

const getClassData = (assignments: FormattedAssignment[], classID: string) => {
  const filteredAssignments = assignments.filter(
    (assignment) => assignment.classID === classID,
  );

  const grades = filteredAssignments
    .map((assignment) => assignment.grades)
    .join()
    .split(",")
    .map((num) => Number(num));

  const { min, max, difference, avg } = getScores(grades);

  return {
    label: filteredAssignments[0]?.classLabel,
    difference,
    avg,
    min,
    max,
  };
};

export default async function HomePage() {
  const { formatted: assignments } = await getAssignments();
  const { formatted: students } = await getStudents();

  const classSummary = CLASS_IDS.map((id) =>
    getClassData(assignments || [], id),
  );

  const topStudent = students?.[0];

  const atRiskStudents = students?.slice(-5).sort((a, b) => a.avg - b.avg);
  const starStudents = students?.slice(0, 5);

  return (
    <Section>
      <header>
        <h1 className={`p-2 text-2xl font-bold ${serif.className}`}>Home</h1>
      </header>
      <div className="flex grid-cols-2 flex-col gap-3 sm:grid">
        <Card heading="Classroom Grades">
          <div className="flex items-center justify-center">
            <svg width={260} height={106}>
              {classSummary.map((data, index) => (
                <g tabIndex={0} key={index}>
                  <text
                    x={6}
                    y={index * 25 + 20}
                    className="text-sm font-semibold"
                  >
                    {data.label}
                  </text>
                  <line
                    x1={100}
                    x2={200}
                    y1={index * 25 + 5 + 10}
                    y2={index * 25 + 5 + 10}
                    className="stroke-gray-300 stroke-1"
                  />
                  <rect
                    width={data.difference}
                    height={20}
                    className="fill-white stroke-gray-600"
                    y={index * 25 + 5}
                    x={data.min + 100}
                  />
                  <line
                    x1={data.avg + 100}
                    x2={data.avg + 100}
                    y1={index * 25 + 5}
                    y2={index * 25 + 5 + 20}
                    className="stroke-gray-600 stroke-1"
                  />
                  <text
                    x={210}
                    y={index * 25 + 20}
                    className="text-sm font-semibold"
                  >
                    {data.avg}%
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </Card>
        <Card heading="Top Student">
          <StudentCard student={topStudent} />
        </Card>
      </div>
      <Card heading="At Risk Students">
        <div className="flex flex-col items-center justify-center">
          <span className="text-gray-800">
            Top 5 lowest score students ranked in ascending order
          </span>
          <hr className="w-full border border-gray-100" />
          <ul className="w-full">
            {atRiskStudents?.map((student) => (
              <li key={student.studentID}>
                <StudentCard student={student} />
              </li>
            ))}
          </ul>
        </div>
      </Card>
      <Card heading="High Performing Students">
        <div className="flex flex-col items-center justify-center">
          <span className="text-gray-800">
            Top 5 highest score students ranked in decending order
          </span>
          <hr className="w-full border border-gray-100" />
          <ul className="w-full">
            {starStudents?.map((student) => (
              <li key={student.studentID}>
                <StudentCard student={student} />
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </Section>
  );
}
