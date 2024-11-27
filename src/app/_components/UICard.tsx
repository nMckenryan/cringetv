"use client";

export default function UICard({ children }: { children: React.ReactNode }) {
  return (
    <div className="card bg-primary-blue">
      <div className="card-body items-center">{children}</div>
    </div>
  );
}
