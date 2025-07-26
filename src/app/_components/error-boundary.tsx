"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Unplug } from "lucide-react";
import Link from "next/link";

export default function DatabaseErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error caught by error boundary:", error);
  }, [error]);

  // Check if the error is a database connection error
  const isDatabaseError = error.message.includes(
    "Database is currently unavailable",
  );

  if (isDatabaseError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="max-w-md rounded-lg bg-white p-6 shadow-md">
          <Unplug />
          <h2 className="mb-4 text-2xl font-bold text-red-600">
            Database Unavailable
          </h2>
          <p className="mb-4">
            We&apos;re having trouble connecting to our database. Please advise
            the administrator
            <Link
              href="https://github.com/nMckenryan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Here
            </Link>
            or try again later.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => router.refresh()}
              className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            >
              Try again
            </button>
            <button
              onClick={() => router.push("/")}
              className="rounded border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-100"
            >
              Return home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // For other errors, show a generic error message
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-red-600">
          Something went wrong
        </h2>
        <p className="mb-4">
          An unexpected error occurred. Please try again later.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Try again
          </button>
          <button
            onClick={() => router.push("/")}
            className="rounded border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-100"
          >
            Return home
          </button>
        </div>
      </div>
    </div>
  );
}
