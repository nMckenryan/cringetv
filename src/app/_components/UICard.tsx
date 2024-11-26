"use client";

export default function UICard({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col items-center justify-center bg-background-black text-white">
      <div className="card bg-primary text-primary-content">
        <div className="card-body">{children}</div>
      </div>
    </main>
  );
}
