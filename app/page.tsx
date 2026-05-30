import { createClient } from "@supabase/supabase-js";
import { HomeClient } from "@/components/HomeClient";

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
      title: "Advanced React Patterns",
      progress: 75,
      icon_name: "BookOpen",
    },
    {
      id: "2",
      title: "TypeScript Masterclass",
      progress: 45,
      icon_name: "Code",
    },
    {
      id: "3",
      title: "Next.js Performance",
      progress: 90,
      icon_name: "Zap",
    },
    {
      id: "4",
      title: "Design Systems",
      progress: 60,
      icon_name: "Palette",
    },
  ];

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const { data, error } = await supabase.from("Courses").select("*");

    clearTimeout(timeoutId);

    if (data && data.length > 0) {
      courses = data;
    }
  } catch (err) {
    console.error("Supabase error:", err);
  }

  return <HomeClient courses={courses} />;
}
