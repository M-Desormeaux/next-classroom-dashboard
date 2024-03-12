import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface Class {
  classID: string;
  label: string;
  start: string;
  end: string;
  teacher: string;
}

export const getClasses = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
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
