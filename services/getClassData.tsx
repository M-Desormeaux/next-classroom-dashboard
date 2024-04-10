import { useAuth } from "@/hooks/useAuth";

interface ClassData {
  classID: string;
  label: string;
  start: string;
  end: string;
  teacher: string;
}

export const getClassData = async (id: string) => {
  const supabase = await useAuth();

  const { data } = await supabase.from("classes").select().eq("classID", id);

  return data as ClassData[] | null;
};
