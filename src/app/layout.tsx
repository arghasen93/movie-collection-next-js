import type { Metadata } from "next";
import "./globals.css";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Movie Collection App",
  description: "Movie Collection App",
};

export default async function RootLayout({ children,}: { children: React.ReactNode;}) {
  const headersList = await headers();
  const country = headersList.get("x-country-name") || "Unknown";
  const city = headersList.get("X-city") || "Unknown";
  return (
    <html lang="en">
      <head />
      <body className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 shadow">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <a href="/dashboard" className="hover:underline">
                Dashboard
              </a>
              <a href="/upload" className="hover:underline">
                Bulk Upload
              </a>
              <a href="/create" className="hover:underline">
                Create Movie
              </a>
            </div>
            <div className="text-sm">{country} • {city}</div>
          </div>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
