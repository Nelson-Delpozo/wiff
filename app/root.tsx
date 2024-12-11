import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "@remix-run/react";

import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-full flex-col justify-between">
        <main className="flex flex-grow flex-col">
          <Outlet />
        </main>
        <footer className="bg-black pb-4 text-center text-yellow-700">
          <div className="container mx-auto flex items-center justify-between">
          <p className="ml-3">
              <Link
                to="https://www.youtube.com/watch?v=q-Y0bnx6Ndw"
                className="text-black underline hover:text-gray-700"
              >
                Rick
              </Link>
            </p>
            <p>
              <Link
                to="/"
                className="text-yellow-700 underline hover:text-yellow-500"
              >
                &copy; Wiff Week 2025
              </Link>
            </p>
            <p className="mr-3">
              <Link
                to="/list"
                className="text-black underline hover:text-gray-700"
              >
                List
              </Link>
            </p>
          </div>
        </footer>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
