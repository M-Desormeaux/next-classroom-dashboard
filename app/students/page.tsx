import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Abacus | Students",
};

export default async function StudentsPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: students } = await supabase
    .from("students")
    .select(
      "*, grades(score, aLabel:assignments(label), cLabel:classes(label) )"
    );

  return (
    <>
      <h2 className="text-2xl py-1">Students</h2>
      <pre>{JSON.stringify(students, null, 2)}</pre>
    </>
  );
}
