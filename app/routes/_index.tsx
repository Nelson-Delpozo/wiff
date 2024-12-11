import { ActionFunction } from "@remix-run/node";
import { useActionData, Form, useNavigation } from "@remix-run/react";

import CountdownTimer from "~/components/CountdownTimer";
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
  const navigation = useNavigation(); // Tracks submission state
  const targetDate = new Date("2025-12-01T20:00:00-05:00"); // 8 PM EST

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-full bg-black text-yellow-700 relative">
      <div className="my-0">
        <CountdownTimer targetDate={targetDate} />
      </div>
      <div className="mx-auto flex flex-col items-center justify-center">
        <h3 className="text-xl mb-4 mt-10 font-paint">Sign up to get updates</h3>
        <Form
          method="post"
          className="space-y-4 flex flex-col items-center"
          key={navigation.state === "submitting" ? Date.now() : "form"}
        >
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            className="p-2 rounded border text-black w-64"
          />
          <button
            type="submit"
            className="p-2 mt-4 rounded bg-yellow-600 text-black w-64"
          >
            Submit
          </button>
        </Form>
        {actionData?.error ? <p className="text-red-500 mt-4">{actionData.error}</p> : null}
        {actionData?.success ? (
          <p className="text-green-500 mt-4">Thank you! We&apos;ll keep you posted!</p>
        ) : null}
      </div>
    </div>
  );
}
