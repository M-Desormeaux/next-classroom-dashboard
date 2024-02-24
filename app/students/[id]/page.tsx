export default async function StudentPage({
  params,
}: {
  params: { id: string };
}) {
  return <div>{params.id}</div>;
}
