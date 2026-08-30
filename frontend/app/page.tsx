"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { getStatistics } from "@/lib/api";

type Statistics = {
  totalTickets: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  critical: number;
};

export default function Home() {
  const [statistics, setStatistics] =
    useState<Statistics | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadStatistics() {
    try {
      setLoading(true);
      setError("");

      const data = await getStatistics();

      setStatistics(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load dashboard statistics."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStatistics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Reusable Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen">

        {/* Reusable Header */}
        <Header />

        {/* Dashboard Content */}
        <div className="p-4 md:p-8">

          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome back 👋
            </h1>

            <p className="mt-1 text-slate-500">
              Here's what's happening with your support tickets today.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">

              <span>⚠️ {error}</span>

              <button
                onClick={loadStatistics}
                className="font-semibold underline"
              >
                Retry
              </button>

            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* Total */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                Total Tickets
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {loading ? "..." : statistics?.totalTickets ?? 0}
              </h2>

              <p className="mt-2 text-sm text-green-600">
                All support tickets
              </p>

            </div>

            {/* Open */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                Open
              </p>

              <h2 className="mt-2 text-3xl font-bold text-blue-600">
                {loading ? "..." : statistics?.open ?? 0}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Need attention
              </p>

            </div>

            {/* In Progress */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                In Progress
              </p>

              <h2 className="mt-2 text-3xl font-bold text-orange-500">
                {loading
                  ? "..."
                  : statistics?.inProgress ?? 0}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Currently being handled
              </p>

            </div>

            {/* Critical */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                Critical
              </p>

              <h2 className="mt-2 text-3xl font-bold text-red-600">
                {loading
                  ? "..."
                  : statistics?.critical ?? 0}
              </h2>

              <p className="mt-2 text-sm text-red-500">
                High priority tickets
              </p>

            </div>

          </div>

          {/* Additional Statistics */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">

            {/* Resolved */}
            <div className="rounded-xl border bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Resolved
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-green-600">
                    {loading
                      ? "..."
                      : statistics?.resolved ?? 0}
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  ✓
                </div>

              </div>

            </div>

            {/* Closed */}
            <div className="rounded-xl border bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Closed
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-slate-600">
                    {loading
                      ? "..."
                      : statistics?.closed ?? 0}
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  ✓
                </div>

              </div>

            </div>

            {/* Active */}
            <div className="rounded-xl border bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Active Tickets
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-blue-600">
                    {loading
                      ? "..."
                      : (statistics?.open ?? 0) +
                        (statistics?.inProgress ?? 0)}
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  🎫
                </div>

              </div>

            </div>

          </div>

          {/* Quick Actions */}
          <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Quick Actions
                </h2>

                <p className="text-sm text-slate-500">
                  Manage your support tickets
                </p>
              </div>

              <div className="flex gap-3">

                <Link
                  href="/tickets"
                  className="rounded-lg border bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  View Tickets
                </Link>

                <Link
                  href="/tickets/new"
                  className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  + Create Ticket
                </Link>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}