"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getTicket, updateTicket } from "@/lib/api";

type Ticket = {
  id: number;
  title: string;
  description: string;
  customerName: string;
  customerEmail: string;
  priority: string;
  status: string;
  assignedTo: string;
};

export default function EditTicketPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [ticket, setTicket] = useState<Ticket | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Open");
  const [assignedTo, setAssignedTo] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTicket() {
      try {
        setLoading(true);

        const data = await getTicket(id);

        setTicket(data);

        setTitle(data.title);
        setDescription(data.description);
        setCustomerName(data.customerName);
        setCustomerEmail(data.customerEmail);
        setPriority(data.priority);
        setStatus(data.status);
        setAssignedTo(data.assignedTo);
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

    if (id) {
      loadTicket();
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Ticket title is required.");
      return;
    }

    if (!description.trim()) {
      setError("Description is required.");
      return;
    }

    if (!customerName.trim()) {
      setError("Customer name is required.");
      return;
    }

    if (!customerEmail.trim()) {
      setError("Customer email is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await updateTicket(id, {
        title,
        description,
        customerName,
        customerEmail,
        priority,
        status,
        assignedTo,
      });

      router.push(`/tickets/${id}`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update ticket."
      );
    } finally {
      setSaving(false);
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

  if (!ticket) {
    return (
      <div className="p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
            <h1 className="text-xl font-bold text-red-800">
              Ticket Not Found
            </h1>

            <p className="mt-2 text-sm text-red-600">
              {error || "The requested ticket could not be found."}
            </p>

            <Link
              href="/tickets"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Back to Tickets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">

      {/* Heading */}
      <div className="mx-auto mb-6 max-w-5xl">

        <Link
          href={`/tickets/${id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to Ticket
        </Link>

        <div className="mt-5">
          <h1 className="text-2xl font-bold text-slate-900">
            Edit Ticket
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Update the information for ticket #{ticket.id}.
          </p>
        </div>

      </div>

      {/* Form */}
      <main className="mx-auto max-w-5xl">

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border bg-white shadow-sm"
        >

          {/* Ticket Information */}
          <div className="border-b p-6">

            <h2 className="text-lg font-semibold text-slate-900">
              Ticket Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update the customer's support request.
            </p>

            <div className="mt-6 space-y-5">

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Ticket Title *
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter ticket title"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description *
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  rows={5}
                  placeholder="Describe the issue..."
                  className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

            </div>

          </div>

          {/* Customer Information */}
          <div className="border-b p-6">

            <h2 className="text-lg font-semibold text-slate-900">
              Customer Information
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Customer Name *
                </label>

                <input
                  type="text"
                  value={customerName}
                  onChange={(e) =>
                    setCustomerName(e.target.value)
                  }
                  placeholder="Customer name"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Customer Email *
                </label>

                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) =>
                    setCustomerEmail(e.target.value)
                  }
                  placeholder="customer@email.com"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

            </div>

          </div>

          {/* Assignment */}
          <div className="p-6">

            <h2 className="text-lg font-semibold text-slate-900">
              Ticket Assignment
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">

              {/* Priority */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
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

              {/* Assigned To */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Assigned To
                </label>

                <select
                  value={assignedTo}
                  onChange={(e) =>
                    setAssignedTo(e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">
                    Select agent
                  </option>

                  <option value="John Smith">
                    John Smith
                  </option>

                  <option value="Sarah Wilson">
                    Sarah Wilson
                  </option>

                  <option value="David Brown">
                    David Brown
                  </option>

                  <option value="Emily Johnson">
                    Emily Johnson
                  </option>
                </select>
              </div>

            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="mx-6 mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              ⚠️ {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse justify-end gap-3 border-t bg-slate-50 p-6 sm:flex-row">

            <Link
              href={`/tickets/${id}`}
              className="rounded-lg border bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}