"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import * as Icons from "lucide-react";

interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
}

interface HomeClientProps {
  courses: Course[];
}

const iconMap: Record<string, any> = {
  BookOpen: Icons.BookOpen,
  Code: Icons.Code,
  Zap: Icons.Zap,
  Palette: Icons.Palette,
  Brain: Icons.Brain,
  Rocket: Icons.Rocket,
  Shield: Icons.Shield,
  Cpu: Icons.Cpu,
};

export function HomeClient({ courses }: HomeClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
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

  const skeletonItemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      {}
      <aside
        className={`
          ${sidebarOpen ? "w-64" : "w-20"}
          sticky 
          top-0
          bg-slate-900
          p-6
          h-full-screen
          md:relative
          z-50
          transition-all
          duration-300
          hidden
          md:flex
          flex-col
          border-r
          border-slate-800
        `}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-8 text-2xl flex justify-start"
        >
          ☰
        </button>

        <h2
          className={`${
            sidebarOpen ? "text-2xl" : "text-sm"
          } font-bold mb-8 transition-all`}
        >
          {sidebarOpen ? "Logo" : "L"}
        </h2>

        <nav className="space-y-4">
          <div className="p-2 pr-5 bg-blue-600 rounded-xl cursor-pointer transition-all duration-300 hover:bg-blue-500">
            {sidebarOpen ? "Dashboard" : "📊"}
          </div>

          <div className="p-3 hover:bg-slate-800 rounded-xl cursor-pointer transition-all duration-300">
            {sidebarOpen ? "Courses" : "📚"}
          </div>

          <div className="p-3 hover:bg-slate-800 rounded-xl cursor-pointer transition-all duration-300">
            {sidebarOpen ? "Profile" : "👤"}
          </div>
        </nav>
      </aside>

      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 flex justify-around items-center p-4 md:hidden z-50 backdrop-blur-lg">
        <button className="text-blue-400 text-xl">📊</button>
        <button className="text-gray-400 text-xl">📚</button>
        <button className="text-gray-400 text-xl">👤</button>
      </div>

      <main className="flex-1 p-4 md:p-6 lg:p-8 transition-all duration-300 pb-24 md:pb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Welcome back, Shivam
        </h1>

        <motion.div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="
              col-span-1
              md:col-span-2
              xl:col-span-3
              bg-gradient-to-br
              from-blue-600
              to-blue-800
              p-8
              rounded-2xl
              hover:shadow-2xl
              hover:shadow-blue-500/20
              transition-all
              duration-300
            "
          >
            <h2 className="text-2xl md:text-3xl font-bold">Learning Streak</h2>

            <p className="text-5xl md:text-6xl font-bold mt-4">7 Days</p>
          </motion.div>

          {courses.length > 0 ? (
            courses.map((course: Course) => {
              const Icon = iconMap[course.icon_name] || Icons.BookOpen;

              return (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    y: -5,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="
                    relative
                    overflow-hidden
                    bg-slate-900
                    border
                    border-blue-500/30
                    hover:border-blue-400
                    p-6
                    rounded-2xl
                    cursor-pointer
                    transition-all
                    duration-300
                    hover:shadow-lg
                    hover:shadow-blue-500/20
                  "
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="
                          p-3
                          rounded-xl
                          bg-blue-500/10
                          border
                          border-blue-400/20
                        "
                      >
                        <Icon className="w-6 h-6 text-blue-400" />
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-white">
                        {course.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-400 mt-2">
                      {course.progress}% Complete
                    </p>

                    <div className="bg-slate-700 h-2 rounded-full mt-4 overflow-hidden">
                      <motion.div
                        className="bg-blue-500 h-2 rounded-full"
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
                </motion.div>
              );
            })
          ) : (
            <>
              <motion.div
                variants={skeletonItemVariants}
                className="
                  bg-slate-800
                  border
                  border-slate-700
                  p-6
                  rounded-2xl
                  h-32
                  animate-pulse
                "
              />

              <motion.div
                variants={skeletonItemVariants}
                className="
                  bg-slate-800
                  border
                  border-slate-700
                  p-6
                  rounded-2xl
                  h-32
                  animate-pulse
                "
              />

              <motion.div
                variants={skeletonItemVariants}
                className="
                  bg-slate-800
                  border
                  border-slate-700
                  p-6
                  rounded-2xl
                  h-32
                  animate-pulse
                "
              />
            </>
          )}

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="
              col-span-1
              md:col-span-2
              xl:col-span-3
              bg-slate-900
              border
              border-slate-800
              p-6
              rounded-2xl
            "
          >
            <h3 className="text-2xl font-bold">Activity</h3>

            <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-gray-400 text-sm">Total Courses</p>

                <p className="text-3xl font-bold mt-1">{courses.length}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Current Streak</p>

                <p className="text-3xl font-bold mt-1 text-blue-400">7 Days</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Progress</p>

                <p className="text-3xl font-bold mt-1">82%</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
