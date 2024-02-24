export default async function AssignmentPage({
  params,
}: {
  params: { id: string };
}) {
  return <div>{params.id}</div>;
}
