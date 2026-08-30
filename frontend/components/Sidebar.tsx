"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isTicketsActive = pathname.startsWith("/tickets");

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 bg-slate-900 text-white md:block">

      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold">
          SupportDesk
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Support Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 p-4">

        <Link
          href="/"
          className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
            pathname === "/"
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          <span>📊</span>
          Dashboard
        </Link>

        <Link
          href="/tickets"
          className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
            isTicketsActive
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          <span>🎫</span>
          Tickets
        </Link>

        <Link
          href="/tickets/new"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
        >
          <span>➕</span>
          Create Ticket
        </Link>

      </nav>

      {/* Bottom User */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 p-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold">
            AD
          </div>

          <div>
            <p className="text-sm font-semibold">
              Admin User
            </p>

            <p className="text-xs text-slate-400">
              Support Manager
            </p>
          </div>

        </div>

      </div>

    </aside>
  );
}