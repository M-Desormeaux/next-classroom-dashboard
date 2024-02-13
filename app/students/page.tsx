import { getStudents } from "@/services/getStudents";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Abacus | Students",
};

export default async function StudentsPage() {
  const students = await getStudents();

  return (
    <>
      <h2 className="text-2xl py-1">Students</h2>
      <pre>{JSON.stringify(students, null, 2)}</pre>
    </>
  );
}
