export default function UICard({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="ui-card"
      className="card w-[80vw] bg-primary-blue px-10 shadow-xl lg:w-[70vw]"
    >
      <div className="card-body items-center">{children}</div>
    </div>
  );
}
