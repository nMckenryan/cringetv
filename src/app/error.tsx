"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Check if the error is a database connection error
  const isDatabaseError = error.message.includes("prisma");

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-primary-blue-light p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-white">
          {isDatabaseError ? "Database Unavailable" : "Something went wrong!"}
        </h2>
        <p className="mb-6 text-white">
          {isDatabaseError
            ? "We're having trouble connecting to our database. Please try again later."
            : error.message || "An unexpected error occurred."}
        </p>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
          <button
            onClick={() => reset()}
            className="flex-1 rounded bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
