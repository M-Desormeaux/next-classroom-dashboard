import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const useAuth = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  } else {
    return supabase;
  }
};
