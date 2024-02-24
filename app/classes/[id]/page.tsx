export default async function ClassPage({
  params,
}: {
  params: { id: string };
}) {
  return <div>{params.id}</div>;
}
