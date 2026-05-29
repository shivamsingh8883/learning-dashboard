"use client";

import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        );
        const { data, error } = await supabase.from("Courses").select("*");

        if (error) {
          console.error("Error fetching:", error);
          return;
        }

        console.log("Fetched courses:", data);
        setCourses(data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
      setLoading(false);
    }

    fetchCourses();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants : any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-slate-900 p-6 h-screen fixed md:relative left-0 top-0 z-50 transition-all duration-300`}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-8 text-2xl"
        >
          ☰
        </button>
        <h2
          className={`${sidebarOpen ? "text-2xl" : "text-sm"} font-bold mb-8`}
        >
          {sidebarOpen ? "Logo" : "L"}
        </h2>
        <nav className="space-y-4">
          <div className="p-3 bg-blue-600 rounded-lg cursor-pointer">
            {sidebarOpen ? "Dashboard" : "📊"}
          </div>
          <div className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer">
            {sidebarOpen ? "Courses" : "📚"}
          </div>
          <div className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer">
            {sidebarOpen ? "Profile" : "👤"}
          </div>
        </nav>
      </aside>

      <main
        className={`flex-1 p-8 ${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300`}
      >
        <h1 className="text-4xl font-bold mb-8">Welcome back, Shivam</h1>

        <motion.div
          className="grid grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-lg hover:shadow-lg transition-shadow"
          >
            <h2 className="text-3xl font-bold">Learning Streak</h2>
            <p className="text-6xl font-bold mt-4">7 Days</p>
          </motion.div>

          {courses.map((course: any) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-800 p-6 rounded-lg cursor-pointer"
            >
              <h3 className="text-xl font-bold">{course.title}</h3>
              <p className="text-sm text-gray-400 mt-2">
                {course.progress}% Complete
              </p>
              <div className="bg-slate-700 h-2 rounded-full mt-4">
                <motion.div
                  className="bg-green-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
            </motion.div>
          ))}

          <motion.div
            variants={itemVariants}
            className="col-span-3 bg-slate-800 p-6 rounded-lg"
          >
            <h3 className="text-2xl font-bold">Activity</h3>
            <p className="text-gray-400 mt-4">Courses: {courses.length}</p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
