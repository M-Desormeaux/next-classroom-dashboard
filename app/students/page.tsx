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
      <h1 className="py-1 text-2xl">Students</h1>
      <pre>{JSON.stringify(students, null, 2)}</pre>
    </>
  );
}
