import { getScores } from "@/utils/getScores";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface Grade {
  score: number;
  assignments: {
    label: string;
    classID: string;
    assignmentID: string;
  };
  label: string;
  classLabel: {
    label: string;
  };
}

interface Student {
  studentID: string;
  name: string;
  grades: Grade[];
}

export type GetStudentSchema = Student[] | null;

export const getStudent = async (id: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data }: { data: GetStudentSchema } = await supabase
    .from("students")
    .select("*, grades(score, assignments(*), classLabel:classes(label) )")
    .eq("studentID", id);

  // returns array of sorted students with information shape improved
  const formatted =
    data?.map((student) => {
      const numericalGrades = student.grades.map((grade) => grade.score);
      const grades = student.grades
        .map((grade) => ({
          ...grade,
          ...grade.assignments,
          classLabel: grade.classLabel.label,
          assignments: null,
        }))
        .sort((a, b) => b.score - a.score);

      const uniqueClassIDs = grades.map((grade) => grade.classID);

      const classes = [...new Set(uniqueClassIDs)];

      const { avg } = getScores(numericalGrades);

      const classDivGrades = classes.map((id) => {
        const classGrades = grades.filter((grade) => grade.classID === id);

        return { label: classGrades[0].classLabel, classGrades };
      });

      return {
        ...student,
        grades: classDivGrades,

        avg,
      };
    }) ?? null;

  return formatted;
};
