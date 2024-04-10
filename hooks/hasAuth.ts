import { createClient } from "@/utils/supabase/server";

export const hasAuth = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return !(error || !data?.user);
};
