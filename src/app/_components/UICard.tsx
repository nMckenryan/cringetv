"use client";

export default function UICard({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-background-black flex flex-col items-center justify-center text-white">
      <div className="card bg-primary text-primary-content">
        <div className="card-body">{children}</div>
      </div>
    </main>
  );
}
