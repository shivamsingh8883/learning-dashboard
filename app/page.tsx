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

    console.log("================================");
    console.log("SUPABASE DATA:", JSON.stringify(data));
    console.log("DATA LENGTH:", data?.length);
    console.log("SUPABASE ERROR:", JSON.stringify(error));
    console.log("================================");

    if (error) {
      return (
        <div
          style={{
            padding: "40px",
            color: "red",
            fontFamily: "monospace",
          }}
        >
          <h1>Supabase Error</h1>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      );
    }

    if (data) {
      courses = data;
    }
  } catch (err) {
    console.error("CATCH ERROR:", err);

    return (
      <div
        style={{
          padding: "40px",
          color: "red",
          fontFamily: "monospace",
        }}
      >
        <h1>Catch Error</h1>
        <pre>{JSON.stringify(err, null, 2)}</pre>
      </div>
    );
  }

  return <HomeClient courses={courses} />;
}
