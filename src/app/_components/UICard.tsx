"use client";

export default function UICard({ children }: { children: React.ReactNode }) {
  return (
    <div id="ui-card" className="card bg-primary-blue px-10 shadow-xl">
      <div className="card-body items-center">{children}</div>
    </div>
  );
}
