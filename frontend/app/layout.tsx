import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SupportDesk",
  description: "Support Ticket Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}