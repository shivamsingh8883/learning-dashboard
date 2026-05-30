import { createClient } from "@supabase/supabase-js";
import { HomeClient } from "@/components/HomeClient";

export const dynamic = "force-dynamic";

interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
}

export default async function Home() {
  let courses: Course[] = [];

  try {
    console.log("===== SUPABASE DEBUG START =====");

    console.log(
      "NEXT_PUBLIC_SUPABASE_URL:",
      process.env.NEXT_PUBLIC_SUPABASE_URL,
    );

    console.log(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY EXISTS:",
      !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    );

    const { data, error } = await supabase.from("Courses").select("*");

    console.log("SUPABASE DATA:", data);
    console.log("DATA LENGTH:", data?.length);
    console.log("SUPABASE ERROR:", error);

    if (error) {
      throw error;
    }

    if (data) {
      courses = data;
    }

    console.log("===== SUPABASE DEBUG END =====");
  } catch (err) {
    console.error("CATCH ERROR:", err);
  }

  return <HomeClient courses={courses} />;
}
