export const API_URL = "https://localhost:7296/api";

export async function getTickets(
  search = "",
  status = "",
  priority = "",
  sortBy = "createdDate",
  sortOrder = "desc",
  page = 1,
  pageSize = 10
) {
  const params = new URLSearchParams();

  if (search) {
    params.append("search", search);
  }

  if (status) {
    params.append("status", status);
  }

  if (priority) {
    params.append("priority", priority);
  }

  params.append("sortBy", sortBy);
  params.append("sortOrder", sortOrder);
  params.append("page", page.toString());
  params.append("pageSize", pageSize.toString());

  const response = await fetch(
    `${API_URL}/tickets?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tickets.");
  }

  return response.json();
}

export async function getTicket(id: string) {
  const response = await fetch(`${API_URL}/tickets/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch ticket.");
  }

  return response.json();
}

export async function createTicket(ticket: unknown) {
  const response = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticket),
  });

  if (!response.ok) {
    throw new Error("Failed to create ticket.");
  }

  return response.json();
}

export async function updateTicket(
  id: string,
  ticket: unknown
) {
  const response = await fetch(`${API_URL}/tickets/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticket),
  });

  if (!response.ok) {
    throw new Error("Failed to update ticket.");
  }

  return response.json();
}

export async function updateTicketStatus(
  id: string,
  status: string
) {
  const response = await fetch(
    `${API_URL}/tickets/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update ticket status.");
  }

  return response.json();
}

export async function deleteTicket(id: string) {
  const response = await fetch(
    `${API_URL}/tickets/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete ticket.");
  }
}
export async function getStatistics() {
  const response = await fetch(
    "https://localhost:7296/api/tickets/statistics"
  );

  if (!response.ok) {
    throw new Error("Failed to load dashboard statistics.");
  }

  return response.json();
}