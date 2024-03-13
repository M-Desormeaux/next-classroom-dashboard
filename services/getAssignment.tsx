import { getScores } from "@/utils/getScores";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface Grade {
  name: string;
  score: number;
  classID: string;
  gradeID: string;
  studentID: string;
  classLabel: string;
  assignmentID: string;
}

interface Assignment {
  assignmentID: string;
  classID: string;
  label: string;
  classLabel: {
    label: string;
    teacher: string;
  };
  grades: {
    score: number;
    classID: string;
    name: { name: string };
    classLabel: { label: string };
    gradeID: string;
    studentID: string;
    assignmentID: string;
  }[];
}

type GetAssignmentsSchema = Assignment[] | null;

export interface FormattedAssignment {
  assignmentID: string;
  classID: string;
  label: string;
  teacher: string;
  classLabel: string;
  grades: Grade[];

  min: number;
  max: number;
  difference: number;
  avg: number;
}

export const getAssignment = async (id: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data }: { data: GetAssignmentsSchema } = await supabase
    .from("assignments")
    .select(
      "*, classLabel:classes(teacher, label), grades(*, classLabel:classes(label), name:students(name))",
    )
    .eq("assignmentID", id);

  const formatted: FormattedAssignment[] | null =
    data?.map((assignment) => {
      const grades = assignment.grades.map((grade) => grade.score);
      const formattedGrades = assignment.grades.map((grade) => ({
        ...grade,
        name: grade.name.name,
        classLabel: grade.classLabel.label,
      }));

      const { min, max, difference, avg } = getScores(grades);

      return {
        ...assignment,
        grades: formattedGrades,
        teacher: assignment.classLabel.teacher,
        classLabel: assignment.classLabel.label,
        min,
        max,
        difference,
        avg,
      };
    }) ?? null;

  return formatted;
};
