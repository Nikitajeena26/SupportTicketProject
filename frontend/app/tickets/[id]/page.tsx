"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  getTicket,
  updateTicketStatus,
  deleteTicket,
} from "@/lib/api";

type Ticket = {
  id: number;
  title: string;
  description: string;
  customerName: string;
  customerEmail: string;
  priority: string;
  status: string;
  assignedTo: string;
  createdDate: string;
  updatedDate: string;
};

export default function TicketDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  async function loadTicket() {
    try {
      setLoading(true);
      setError("");

      const data = await getTicket(id);

      setTicket(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load ticket."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      loadTicket();
    }
  }, [id]);

  async function handleStatusChange(newStatus: string) {
    if (!ticket || newStatus === ticket.status) {
      return;
    }

    try {
      setUpdatingStatus(true);
      setError("");

      const updatedTicket = await updateTicketStatus(
        id,
        newStatus
      );

      setTicket(updatedTicket);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update ticket status."
      );
    } finally {
      setUpdatingStatus(false);
    }
  }

  async function handleDelete() {
    if (!ticket) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ticket #${ticket.id}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteTicket(id);

      router.push("/tickets");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete ticket."
      );

      setDeleting(false);
    }
  }

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

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="text-sm text-slate-500">
            Loading ticket...
          </p>
        </div>
      </div>
    );
  }

  if (error && !ticket) {
    return (
      <div className="p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/tickets"
            className="text-sm font-medium text-blue-600"
          >
            ← Back to Tickets
          </Link>

          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-8 text-center">
            <div className="mb-3 text-5xl">⚠️</div>

            <h1 className="text-xl font-bold text-red-800">
              Ticket Not Found
            </h1>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

            <Link
              href="/tickets"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Back to Tickets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return null;
  }

  return (
    <div className="p-4 md:p-8">

      {/* Page Heading */}
      <div className="mx-auto mb-6 max-w-6xl">

        <Link
          href="/tickets"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to Tickets
        </Link>

        <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <div className="flex items-center gap-3">

              <span className="text-sm font-semibold text-slate-500">
                #{ticket.id}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityClass(
                  ticket.priority
                )}`}
              >
                {ticket.priority}
              </span>

            </div>

            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              {ticket.title}
            </h1>

          </div>

          <div className="flex gap-3">

            <Link
              href={`/tickets/${ticket.id}/edit`}
              className="rounded-lg border bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              ✏️ Edit
            </Link>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "🗑 Delete"}
            </button>

          </div>

        </div>

      </div>

      {error && (
        <div className="mx-auto mb-6 max-w-6xl rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* Content */}
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Left */}
        <div className="lg:col-span-2">

          {/* Description */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900">
              Ticket Description
            </h2>

            <div className="mt-4 rounded-lg bg-slate-50 p-5">

              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                {ticket.description}
              </p>

            </div>

          </div>

          {/* Customer */}
          <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900">
              Customer Information
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Customer Name
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {ticket.customerName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Email
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {ticket.customerEmail}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Right */}
        <div className="space-y-6">

          {/* Status */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900">
              Ticket Status
            </h2>

            <div className="mt-4">
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusClass(
                  ticket.status
                )}`}
              >
                {ticket.status}
              </span>
            </div>

            <div className="mt-5">

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Change Status
              </label>

              <select
                value={ticket.status}
                disabled={updatingStatus}
                onChange={(e) =>
                  handleStatusChange(e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="Open">Open</option>
                <option value="In Progress">
                  In Progress
                </option>
                <option value="Resolved">
                  Resolved
                </option>
                <option value="Closed">Closed</option>
              </select>

            </div>

          </div>

          {/* Assignment */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900">
              Assignment
            </h2>

            <div className="mt-5">

              <p className="text-xs font-medium uppercase text-slate-400">
                Assigned To
              </p>

              <div className="mt-2 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                  {ticket.assignedTo
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </div>

                <p className="font-semibold text-slate-800">
                  {ticket.assignedTo}
                </p>

              </div>

            </div>

          </div>

          {/* Timeline */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900">
              Timeline
            </h2>

            <div className="mt-5 space-y-4">

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Created
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {new Date(
                    ticket.createdDate
                  ).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Last Updated
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {new Date(
                    ticket.updatedDate
                  ).toLocaleString()}
                </p>
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}