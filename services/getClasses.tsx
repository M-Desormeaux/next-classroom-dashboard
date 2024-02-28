import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const getClasses = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data }: { data: any } = await supabase.from("classes").select();

  return data;
};
