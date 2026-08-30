"use client";

import { useRouter } from "next/navigation";
import TicketForm from "@/components/TicketForm";
import { createTicket } from "@/lib/api";

type TicketFormData = {
  title: string;
  description: string;
  customerName: string;
  customerEmail: string;
  priority: string;
  status: string;
  assignedTo: string;
};

export default function NewTicketPage() {
  const router = useRouter();

  async function handleCreateTicket(data: TicketFormData) {
    await createTicket(data);

    router.push("/tickets");
  }

  return (
    <div className="p-4 md:p-8">

      {/* Page Heading */}
      <div className="mx-auto mb-6 max-w-5xl">

        <h1 className="text-2xl font-bold text-slate-900">
          Create New Ticket
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a new customer support request.
        </p>

      </div>

      {/* Ticket Form */}
      <main className="mx-auto max-w-5xl">

        <TicketForm
          submitText="Create Ticket"
          onSubmit={handleCreateTicket}
        />

      </main>

    </div>
  );
}