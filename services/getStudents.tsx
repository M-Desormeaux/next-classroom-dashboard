import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const getStudents = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: students } = await supabase
    .from("students")
    .select(
      "*, grades(score, aLabel:assignments(label), cLabel:classes(label) )"
    );

  return students;
};
