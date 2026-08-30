"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTickets } from "@/lib/api";

type Ticket = {
  id: number;
  title: string;
  customerName: string;
  customerEmail: string;
  priority: string;
  status: string;
  assignedTo: string;
  createdDate: string;
};

type TicketResponse = {
  items: Ticket[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sortBy, setSortBy] = useState("createdDate");
  const [sortOrder, setSortOrder] = useState("desc");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTickets() {
    try {
      setLoading(true);
      setError("");

      const data: TicketResponse = await getTickets(
        search,
        status,
        priority,
        sortBy,
        sortOrder,
        page,
        pageSize
      );

      setTickets(data.items);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load tickets."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTickets();
  }, [search, status, priority, sortBy, sortOrder, page]);

  function getPriorityClass(priority: string) {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700";
      case "High":
        return "bg-orange-100 text-orange-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-green-100 text-green-700";
    }
  }

  function getStatusClass(status: string) {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-700";
      case "In Progress":
        return "bg-orange-100 text-orange-700";
      case "Resolved":
        return "bg-green-100 text-green-700";
      case "Closed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function resetFilters() {
    setSearch("");
    setStatus("");
    setPriority("");
    setSortBy("createdDate");
    setSortOrder("desc");
    setPage(1);
  }

  return (
    <div className="p-4 md:p-8">

      {/* Page Heading */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            All Tickets
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and track customer support requests
          </p>
        </div>

        <Link
          href="/tickets/new"
          className="w-fit rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Create Ticket
        </Link>

      </div>

      {/* Filters */}
      <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center justify-between">

          <div>
            <h2 className="font-semibold text-slate-800">
              Filters
            </h2>

            <p className="text-xs text-slate-500">
              Search, filter and sort tickets
            </p>
          </div>

          <button
            onClick={resetFilters}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Clear Filters
          </button>

        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

          {/* Search */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Search
            </label>

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Title or customer..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* Status */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">
                In Progress
              </option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>

          </div>

          {/* Priority */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>

          </div>

          {/* Sort */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Sort By
            </label>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] =
                  e.target.value.split("-");

                setSortBy(field);
                setSortOrder(order);
                setPage(1);
              }}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="createdDate-desc">
                Newest First
              </option>

              <option value="createdDate-asc">
                Oldest First
              </option>

              <option value="priority-asc">
                Priority A-Z
              </option>

              <option value="status-asc">
                Status A-Z
              </option>
            </select>

          </div>

        </div>

      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">

          <span>⚠️ {error}</span>

          <button
            onClick={loadTickets}
            className="font-semibold underline"
          >
            Retry
          </button>

        </div>
      )}

      {/* Ticket Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

        {loading ? (

          <div className="flex min-h-64 items-center justify-center">

            <div className="text-center">

              <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

              <p className="text-sm text-slate-500">
                Loading tickets...
              </p>

            </div>

          </div>

        ) : tickets.length === 0 ? (

          <div className="flex min-h-64 items-center justify-center p-8">

            <div className="text-center">

              <div className="mb-3 text-5xl">
                🎫
              </div>

              <h3 className="text-lg font-semibold text-slate-800">
                No tickets found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>

              <button
                onClick={resetFilters}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Clear Filters
              </button>

            </div>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[950px]">

              <thead className="border-b bg-slate-50">

                <tr>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    ID
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Ticket
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Priority
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Assigned To
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Created
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase text-slate-500">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y">

                {tickets.map((ticket) => (

                  <tr
                    key={ticket.id}
                    className="transition hover:bg-slate-50"
                  >

                    <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                      #{ticket.id}
                    </td>

                    <td className="px-5 py-4">

                      <Link
                        href={`/tickets/${ticket.id}`}
                        className="font-semibold text-slate-800 hover:text-blue-600"
                      >
                        {ticket.title}
                      </Link>

                    </td>

                    <td className="px-5 py-4">

                      <p className="text-sm font-medium text-slate-700">
                        {ticket.customerName}
                      </p>

                      <p className="text-xs text-slate-400">
                        {ticket.customerEmail}
                      </p>

                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityClass(
                          ticket.priority
                        )}`}
                      >
                        {ticket.priority}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          ticket.status
                        )}`}
                      >
                        {ticket.status}
                      </span>

                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {ticket.assignedTo}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {new Date(
                        ticket.createdDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4 text-right">

                      <Link
                        href={`/tickets/${ticket.id}`}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                      >
                        View →
                      </Link>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* Pagination */}
      {!loading && tickets.length > 0 && (
        <div className="mt-5 flex flex-col items-center justify-between gap-4 sm:flex-row">

          <div>
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {(page - 1) * pageSize + 1}
              </span>
              {" "}-
              <span className="font-semibold text-slate-700">
                {" "}
                {Math.min(
                  page * pageSize,
                  totalItems
                )}
              </span>
              {" "}of{" "}
              <span className="font-semibold text-slate-700">
                {totalItems}
              </span>
              {" "}tickets
            </p>
          </div>

          <div className="flex items-center gap-2">

            <button
              onClick={() =>
                setPage((p) => Math.max(1, p - 1))
              }
              disabled={page === 1}
              className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((pageNumber) => (

              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`h-9 w-9 rounded-lg text-sm font-medium ${
                  page === pageNumber
                    ? "bg-blue-600 text-white"
                    : "border bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {pageNumber}
              </button>

            ))}

            <button
              onClick={() =>
                setPage((p) =>
                  Math.min(totalPages, p + 1)
                )
              }
              disabled={page === totalPages}
              className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>

          </div>

        </div>
      )}

    </div>
  );
}