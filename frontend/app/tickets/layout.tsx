import Link from "next/link";

export default function TicketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">

      <aside className="fixed left-0 top-0 hidden h-screen w-64 bg-slate-900 text-white md:block">

        <div className="p-6">
          <h1 className="text-2xl font-bold">
            SupportDesk
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Ticket Management
          </p>
        </div>

        <nav className="space-y-2 px-4">

          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800"
          >
            <span>📊</span>
            Dashboard
          </Link>

          <Link
            href="/tickets"
            className="flex items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 font-medium"
          >
            <span>🎫</span>
            Tickets
          </Link>

          <Link
            href="/tickets/new"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800"
          >
            <span>➕</span>
            Create Ticket
          </Link>

        </nav>

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

      <main className="md:ml-64">
        {children}
      </main>

    </div>
  );
}