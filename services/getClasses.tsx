import { useAuth } from "@/hooks/useAuth";

interface Class {
  classID: string;
  label: string;
  start: string;
  end: string;
  teacher: string;
}

export const getClasses = async () => {
  const supabase = await useAuth();

  const { data }: { data: Class[] | null } = await supabase
    .from("classes")
    .select();

  const sortedData = data?.sort((a, b) => {
    const check =
      new Date("01/01/2000 " + a.start).getTime() -
      new Date("01/01/2000 " + b.start).getTime();

    return check;
  });

  return sortedData;
};
