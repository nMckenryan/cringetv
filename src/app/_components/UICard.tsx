"use client";

export default function UICard({ children }: { children: React.ReactNode }) {
  return (
    <div className="card bg-primary-blue" style={{ width: "90vm" }}>
      <div className="card-body items-center">{children}</div>
    </div>
  );
}
