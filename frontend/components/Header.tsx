"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");

    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const getTitle = () => {
    if (pathname === "/") return "Dashboard";
    if (pathname === "/tickets") return "Tickets";
    if (pathname === "/tickets/new") return "Create Ticket";
    if (pathname.includes("/edit")) return "Edit Ticket";
    if (pathname.startsWith("/tickets/")) return "Ticket Details";

    return "SupportDesk";
  };

  return (
    <header className="flex min-h-20 items-center justify-between border-b border-slate-200 bg-white px-4 py-4 transition-colors md:px-8 dark:border-slate-700 dark:bg-slate-900">

      <div>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          {getTitle()}
        </h2>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Support ticket management system
        </p>
      </div>

      <div className="flex items-center gap-3 md:gap-4">

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-lg shadow-sm hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          title={darkMode ? "Light Mode" : "Dark Mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Notification */}
        <button
          className="relative rounded-lg p-2 text-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Notifications"
        >
          🔔

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Divider */}
        <div className="hidden h-8 border-l border-slate-200 dark:border-slate-700 sm:block" />

        {/* User */}
        <div className="hidden items-center gap-3 sm:flex">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
            AD
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-white">
              Admin User
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Support Manager
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}