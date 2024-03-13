import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface ClassData {
  classID: string;
  label: string;
  start: string;
  end: string;
  teacher: string;
}

export const getClassData = async (id: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("classes").select().eq("classID", id);

  return data as ClassData[] | null;
};
