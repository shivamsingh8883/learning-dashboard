"use client";

import { useState } from "react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-slate-900 p-6 h-screen fixed md:relative left-0 top-0 z-50 transition-all duration-300`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className={`${sidebarOpen ? "text-2xl" : "text-sm"} font-bold`}>
            {sidebarOpen ? "Logo" : "L"}
          </h2>
        </div>
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

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 md:ml-0 ml-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold">
            Welcome back, Shivam
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden bg-blue-600 p-2 rounded-lg text-xl"
          >
            ☰
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Hero Tile */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-br from-blue-600 to-blue-800 p-6 md:p-8 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-bold">Learning Streak</h2>
            <p className="text-4xl md:text-6xl font-bold mt-4">7 Days</p>
          </div>

          {/* Course Tile 1 */}
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold">React Basics</h3>
            <p className="text-sm text-gray-400 mt-2">75% Complete</p>
            <div className="bg-slate-700 h-2 rounded-full mt-4">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>

          {/* Course Tile 2 */}
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold">Next.js</h3>
            <p className="text-sm text-gray-400 mt-2">60% Complete</p>
            <div className="bg-slate-700 h-2 rounded-full mt-4">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>

          {/* Course Tile 3 */}
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold">Tailwind</h3>
            <p className="text-sm text-gray-400 mt-2">90% Complete</p>
            <div className="bg-slate-700 h-2 rounded-full mt-4">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: "90%" }}
              ></div>
            </div>
          </div>

          {/* Activity Tile */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold">Activity</h3>
            <p className="text-gray-400 mt-4">
              You've been coding 5 days this week!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
