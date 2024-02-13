import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Abacus | Home",
};

export default async function HomePage() {
  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);
  // const { data: notes } = await supabase.from("notes").select();

  return (
    <>
      {/* <pre>{JSON.stringify(notes, null, 2)}</pre> */}
      Home Page
    </>
  );
}
