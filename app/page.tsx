import { createClient } from "@supabase/supabase-js";
import { HomeClient } from "@/components/HomeClient";

export const revalidate = 0;

interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
}

export default async function Home() {
  let courses: Course[] = [
    {
      id: "1",
      title: "Next.js Advanced",
      progress: 60,
      icon_name: "Zap",
    },
    {
      id: "2",
      title: "React Basics",
      progress: 75,
      icon_name: "BookOpen",
    },
    {
      id: "3",
      title: "Framer Motion",
      progress: 40,
      icon_name: "Sparkles",
    },
  ];

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    );

    const { data, error } = await supabase.from("Courses").select("*");

    if (error) {
      console.error("Supabase error:", error);
    }

    if (data && data.length > 0) {
      courses = data;
    }
  } catch (err) {
    console.error("Catch error:", err);
  }

  return <HomeClient courses={courses} />;
}
