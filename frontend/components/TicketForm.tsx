"use client";

import { FormEvent, useState } from "react";

type TicketFormData = {
  title: string;
  description: string;
  customerName: string;
  customerEmail: string;
  priority: string;
  status: string;
  assignedTo: string;
};

type TicketFormProps = {
  initialData?: TicketFormData;
  submitText?: string;
  onSubmit: (data: TicketFormData) => Promise<void>;
};

export default function TicketForm({
  initialData,
  submitText = "Create Ticket",
  onSubmit,
}: TicketFormProps) {
  const [formData, setFormData] = useState<TicketFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    customerName: initialData?.customerName || "",
    customerEmail: initialData?.customerEmail || "",
    priority: initialData?.priority || "",
    status: initialData?.status || "",
    assignedTo: initialData?.assignedTo || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  function updateField(
    field: keyof TicketFormData,
    value: string
  ) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  }

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Customer name is required.";
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Customer email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.customerEmail
      )
    ) {
      newErrors.customerEmail =
        "Please enter a valid email address.";
    }

    if (!formData.priority) {
      newErrors.priority = "Priority is required.";
    }

    if (!formData.status) {
      newErrors.status = "Status is required.";
    }

    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = "Assigned To is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setServerError("");

    if (!validate()) {
      return;
    }

    try {
      setSubmitting(true);

      await onSubmit(formData);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Server Error */}
      {serverError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          ⚠️ {serverError}
        </div>
      )}

      {/* Ticket Information */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Ticket Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter the details of the customer support request.
          </p>
        </div>

        <div className="space-y-5">

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Title <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                updateField("title", e.target.value)
              }
              placeholder="Enter ticket title"
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                errors.title
                  ? "border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }`}
            />

            {errors.title && (
              <p className="mt-1 text-xs text-red-600">
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description <span className="text-red-500">*</span>
            </label>

            <textarea
              value={formData.description}
              onChange={(e) =>
                updateField("description", e.target.value)
              }
              placeholder="Describe the customer issue..."
              rows={5}
              className={`w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none transition ${
                errors.description
                  ? "border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }`}
            />

            {errors.description && (
              <p className="mt-1 text-xs text-red-600">
                {errors.description}
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Customer Information */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Customer Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter the customer's contact information.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Customer Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Customer Name{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={formData.customerName}
              onChange={(e) =>
                updateField(
                  "customerName",
                  e.target.value
                )
              }
              placeholder="e.g. Rahul Sharma"
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
                errors.customerName
                  ? "border-red-400"
                  : "border-slate-300 focus:border-blue-500"
              }`}
            />

            {errors.customerName && (
              <p className="mt-1 text-xs text-red-600">
                {errors.customerName}
              </p>
            )}
          </div>

          {/* Customer Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Customer Email{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              value={formData.customerEmail}
              onChange={(e) =>
                updateField(
                  "customerEmail",
                  e.target.value
                )
              }
              placeholder="customer@example.com"
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
                errors.customerEmail
                  ? "border-red-400"
                  : "border-slate-300 focus:border-blue-500"
              }`}
            />

            {errors.customerEmail && (
              <p className="mt-1 text-xs text-red-600">
                {errors.customerEmail}
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Ticket Assignment */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Ticket Assignment
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Set the priority, status and support agent.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          {/* Priority */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Priority <span className="text-red-500">*</span>
            </label>

            <select
              value={formData.priority}
              onChange={(e) =>
                updateField("priority", e.target.value)
              }
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
                errors.priority
                  ? "border-red-400"
                  : "border-slate-300 focus:border-blue-500"
              }`}
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>

            {errors.priority && (
              <p className="mt-1 text-xs text-red-600">
                {errors.priority}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status <span className="text-red-500">*</span>
            </label>

            <select
              value={formData.status}
              onChange={(e) =>
                updateField("status", e.target.value)
              }
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
                errors.status
                  ? "border-red-400"
                  : "border-slate-300 focus:border-blue-500"
              }`}
            >
              <option value="">Select status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>

            {errors.status && (
              <p className="mt-1 text-xs text-red-600">
                {errors.status}
              </p>
            )}
          </div>

          {/* Assigned To */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Assigned To{" "}
              <span className="text-red-500">*</span>
            </label>

            <select
              value={formData.assignedTo}
              onChange={(e) =>
                updateField(
                  "assignedTo",
                  e.target.value
                )
              }
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
                errors.assignedTo
                  ? "border-red-400"
                  : "border-slate-300 focus:border-blue-500"
              }`}
            >
              <option value="">Select agent</option>
              <option value="John Smith">John Smith</option>
              <option value="Sarah Wilson">
                Sarah Wilson
              </option>
              <option value="David Brown">
                David Brown
              </option>
            </select>

            {errors.assignedTo && (
              <p className="mt-1 text-xs text-red-600">
                {errors.assignedTo}
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3">

        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded-lg border bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving..." : submitText}
        </button>

      </div>

    </form>
  );
}