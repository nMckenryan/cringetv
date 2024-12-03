"use client";

export default function UICard({ children }: { children: React.ReactNode }) {
  return (
    <div className="card bg-primary-blue px-5 shadow-xl">
      <div className="card-body mx-auto items-center px-10">{children}</div>
    </div>
  );
}
