import { getScores } from "@/utils/getScores";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface Grade {
  score: number;
}

interface Assignment {
  assignmentID: string;
  classID: string;
  label: string;
  classLabel: {
    label: string;
  };
  grades: Grade[];
}

type GetAssignmentsSchema = Assignment[] | null;

export interface FormattedAssignment {
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

export const getAssignments = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data }: { data: GetAssignmentsSchema } = await supabase
    .from("assignments")
    .select("*, classLabel:classes(label), grades(score)");

  const formatted: FormattedAssignment[] | null =
    data?.map((assignment) => {
      const grades = assignment.grades.map((grade) => grade.score);

      const { min, max, difference, avg } = getScores(grades);

      return {
        ...assignment,
        grades,
        classLabel: assignment.classLabel.label,
        min,
        max,
        difference,
        avg,
      };
    }) ?? null;

  return { raw: data, formatted };
};
