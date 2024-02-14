import { getAssignments } from "@/services/getAssignments";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abacus | Assignments",
};

export default async function AssignmentsPage() {
  const assignments = await getAssignments();

  return (
    <>
      <h1 className="py-1 text-2xl">Assignments</h1>
      <pre>{JSON.stringify(assignments, null, 2)}</pre>
    </>
  );
}
