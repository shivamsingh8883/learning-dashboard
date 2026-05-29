"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";

interface Course {
  id: string;
  Title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCourses() {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        );

        const { data, error } = await supabase.from("Courses").select("*");

        if (error) {
          console.error(error);
          setError("Failed to load courses");
          return;
        }

        setCourses(data || []);
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      }

      setLoading(false);
    }

    fetchCourses();
  }, []);

  const navItems = [
    {
      name: "Dashboard",
      icon: "LayoutDashboard",
    },
    {
      name: "Courses",
      icon: "BookOpen",
    },
    {
      name: "Profile",
      icon: "User",
    },
  ];

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex overflow-x-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col ${
          sidebarOpen ? "lg:w-64 md:w-24" : "w-24"
        } bg-slate-900/95 backdrop-blur-xl pt-6 pb-6 pr-6 pl-3 h-screen sticky top-0 transition-all duration-300 border-r border-slate-800`}
      >
        {/* Collapse Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-8 text-2xl hover:scale-110 transition-transform self-start"
        >
          ☰
        </button>

        {/* Logo */}
        <h2
          className={`${
            sidebarOpen ? "text-2xl" : "text-lg"
          } font-bold mb-10 tracking-wide`}
        >
          {sidebarOpen ? "EduFlow" : "EF"}
        </h2>

        {/* Navigation */}
        <nav className="space-y-3 relative">
          {navItems.map((item) => {
            const LucideIcon = item.icon as keyof typeof Icons;

            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className="relative w-full"
              >
                <div className="flex items-center gap-3 p-3 rounded-xl relative overflow-hidden">
                  {activeTab === item.name && (
                    <motion.div
                      layoutId="sidebar-highlight"
                      className="absolute inset-0 bg-blue-600"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    />
                  )}

                  {React.createElement(Icons[LucideIcon], {
                    className: "w-5 h-5 z-10 flex-shrink-0",
                  })}

                  {sidebarOpen && (
                    <span className="z-10 text-sm lg:text-base">
                      {item.name}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 z-50">
        <div className="flex justify-around items-center py-4">
          {navItems.map((item) => {
            const LucideIcon = item.icon as keyof typeof Icons;

            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className="relative flex flex-col items-center gap-1"
              >
                {activeTab === item.name && (
                  <motion.div
                    layoutId="mobile-highlight"
                    className="absolute -inset-2 bg-blue-600 rounded-xl"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  />
                )}

                {React.createElement(Icons[LucideIcon], {
                  className: "w-5 h-5 z-10 flex-shrink-0",
                })}

                <span className="text-xs z-10">{item.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 xl:p-8 pb-28 md:pb-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">
            Welcome back, Shivam
          </h1>

          <p className="text-slate-400 mt-2">Continue your learning journey.</p>
        </header>

        {/* Error State */}
        {error ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl">
            {error}
          </div>
        ) : (
          <motion.section
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Hero Tile */}
            <motion.article
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
              }}
              className="xl:col-span-3 relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 border border-blue-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

              <div className="relative z-10">
                <h2 className="text-3xl font-bold">Learning Streak</h2>

                <p className="text-6xl font-bold mt-4">7 Days</p>

                <p className="text-blue-100 mt-3">
                  You're doing amazing. Keep going.
                </p>
              </div>
            </motion.article>

            {/* Loading Skeletons */}
            {loading ? (
              <>
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    variants={itemVariants}
                    className="bg-slate-800 rounded-3xl h-48 animate-pulse"
                  />
                ))}
              </>
            ) : (
              <>
                {/* Course Cards */}
                {courses.map((course) => {
                  const LucideIcon =
                    (course.icon_name as keyof typeof Icons) || "BookOpen";

                  return (
                    <motion.article
                      key={course.id}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.02,
                      }}
                      className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-6 cursor-pointer group"
                    >
                      {/* Mesh Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Glow Border */}
                      <div className="absolute inset-0 rounded-3xl border border-blue-500/0 group-hover:border-blue-500/20 transition-colors duration-500" />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between">
                          <div className="p-3 rounded-2xl bg-slate-800">
                            {React.createElement(Icons[LucideIcon], {
                              className: "w-6 h-6 text-blue-400",
                            })}
                          </div>

                          <span className="text-sm text-slate-400">
                            {course.progress}%
                          </span>
                        </div>

                        <h3 className="text-xl font-bold mt-6">
                          {course.Title}
                        </h3>

                        <p className="text-slate-400 mt-2 text-sm">
                          Course Progress
                        </p>

                        {/* Progress Bar */}
                        <div className="mt-6 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${course.progress}%`,
                            }}
                            transition={{
                              duration: 1,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </>
            )}

            {/* Activity Tile */}
            <motion.article
              variants={itemVariants}
              whileHover={{
                scale: 1.01,
              }}
              className="md:col-span-2 xl:col-span-3 bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold">Activity Overview</h3>

                <p className="text-slate-400 mt-2">
                  Your weekly learning consistency.
                </p>

                {/* Mock Contribution Graph */}
                <div className="grid grid-cols-12 gap-2 mt-8">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: i * 0.02,
                      }}
                      className={`h-6 rounded-md ${
                        i % 4 === 0
                          ? "bg-blue-500/80"
                          : i % 3 === 0
                            ? "bg-blue-500/50"
                            : "bg-slate-800"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between mt-8 text-sm text-slate-400">
                  <span>Total Courses: {courses.length}</span>

                  <span>Consistency: 92%</span>
                </div>
              </div>
            </motion.article>
          </motion.section>
        )}
      </main>
    </div>
  );
}
