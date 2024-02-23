import { getScores } from "@/utils/getScores";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface Grade {
  score: number;
  classLabel: {
    label: string;
  };
  assignmentLabel: {
    label: string;
  };
}

interface Student {
  studentID: string;
  name: string;
  grades: Grade[];
}

export type GetStudentsSchema = Student[] | null;

export const getStudents = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data }: { data: GetStudentsSchema } = await supabase
    .from("students")
    .select(
      "*, grades(score, assignmentLabel:assignments(label), classLabel:classes(label) )",
    );

  // returns array of sorted students with information shape improved
  const formatted =
    data
      ?.map((student) => {
        const numericalGrades = student.grades.map((grade) => grade.score);
        const grades = student.grades
          .map((grade) => ({
            ...grade,
            classLabel: grade.classLabel.label,
            assignmentLabel: grade.assignmentLabel.label,
          }))
          .sort((a, b) => b.score - a.score);

        const classLabels = grades.map((grade) => grade.classLabel);

        const classes = [...new Set(classLabels)];

        const { avg } = getScores(numericalGrades);

        return {
          ...student,
          grades: null,
          classes,

          avg,
        };
      })
      .sort((a, b) => b.avg - a.avg) ?? null;

  return { raw: data, formatted };
};
