export default function UICard({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="ui-card"
      className="card w-screen bg-primary-blue px-10 shadow-xl md:w-[50vw]"
    >
      <div className="card-body items-center">{children}</div>
    </div>
  );
}
