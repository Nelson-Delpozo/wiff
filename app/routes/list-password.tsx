import { Form } from "@remix-run/react";

export default function PasswordPage() {
  return (
    <div className="min-h-full flex items-center justify-center bg-black text-gold">
      <Form method="get" action="/list" className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-paint">Enter Password</h1>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 rounded border text-black"
        />
        <button type="submit" className="p-2 rounded bg-gold text-black hover:bg-yellow-500">
          Submit
        </button>
      </Form>
    </div>
  );
}
