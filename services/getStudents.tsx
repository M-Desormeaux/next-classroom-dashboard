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
  const { data: students }: { data: GetStudentsSchema } = await supabase
    .from("students")
    .select(
      "*, grades(score, assignmentLabel:assignments(label), classLabel:classes(label) )"
    );

  return students;
};
