import { LoaderFunction, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

import { prisma } from "~/db.server";

const PASSWORD = "wiffweek2025"; // Hardcoded password

// Define loader to fetch email signups from the database
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const password = url.searchParams.get("password");

  // Check if the password is correct
  if (password !== PASSWORD) {
    const redirectUrl = new URL("/list-password", url.origin);
    redirectUrl.searchParams.set("error", "Incorrect password. Please try again.");
    return redirect(redirectUrl.toString());
  }

  const emailSignups = await prisma.emailSignup.findMany({
    orderBy: { createdAt: "asc" },
  });
  return json(emailSignups);
};

export default function List() {
  const data = useLoaderData<{ email: string; createdAt: string }[]>();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sort data based on the selected order
  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Trigger plain text CSV download
  const handleExportCSV = () => {
    const csv = data.map((row) => row.email).join(", ");
    const blob = new Blob([csv], { type: "text/plain" }); // Set as plain text
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "email_signups.txt"; // Save as .txt for clarity
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-full bg-black text-gold p-8 text-center">
      <h1 className="text-4xl mb-8 font-paint">Emails</h1>
      <button
        onClick={handleExportCSV}
        className="mb-4 p-2 rounded bg-gold text-black hover:bg-yellow-500"
      >
        Export for emailing
      </button>
      <table className="table-auto w-full bg-yellow-700 text-black rounded overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 cursor-pointer" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
              Date {sortOrder === "asc" ? "▲" : "▼"}
            </th>
            <th className="px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((signup) => (
            <tr key={signup.email} className="bg-yellow-100 hover:bg-yellow-200">
              <td className="px-4 py-2">{new Date(signup.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2">{signup.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
