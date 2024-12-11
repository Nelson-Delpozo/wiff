import { ActionFunction } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";

import { prisma } from "~/db.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");

  if (typeof email !== "string" || !email.includes("@")) {
    return new Response(JSON.stringify({ error: "Please provide a valid email address." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await prisma.emailSignup.create({ data: { email } });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to save email. It might already be registered." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export default function Index() {
  const actionData = useActionData<{ error?: string; success?: boolean }>();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gold">
      <h1 className="text-4xl mb-4">Wiffweek is Coming!</h1>
      {/* Countdown Timer Component will go here */}
      <Form method="post" className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="p-2 rounded border text-black"
        />
        <button type="submit" className="p-2 rounded bg-gold text-black">
          Sign Up
        </button>
      </Form>
      {actionData?.error ? <p className="text-red-500">{actionData.error}</p> : null}
      {actionData?.success ? <p className="text-green-500">Thank you for signing up!</p> : null}
    </div>
  );
}
