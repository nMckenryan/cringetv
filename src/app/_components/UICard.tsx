"use client";

export default function UICard({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="ui-card"
      className="card w-screen bg-primary-blue px-10 shadow-xl md:w-1/2"
    >
      <div className="card-body items-center">{children}</div>
    </div>
  );
}
