import { getAssignments } from "@/services/getAssignments";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abacus | Assignments",
};

export default async function AssignmentsPage() {
  const assignments = await getAssignments();

  return (
    <>
      <h2 className="text-2xl py-1">Assignments</h2>
      <pre>{JSON.stringify(assignments, null, 2)}</pre>
    </>
  );
}
