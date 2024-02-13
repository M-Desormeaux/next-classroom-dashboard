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

export const getAssignments = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: assignments }: { data: GetAssignmentsSchema } = await supabase
    .from("assignments")
    .select("*, classLabel:classes(label), grades(score)");

  return assignments;
};
