import { HydrateClient } from "~/trpc/server";
import Homepage from "./homepage";
import "../styles/embla.css";

export default function App() {
  return (
    <HydrateClient>
      <Homepage />
    </HydrateClient>
  );
}
