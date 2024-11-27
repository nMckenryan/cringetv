import { HydrateClient } from "~/trpc/server";
import Homepage from "./homepage";
import "../styles/embla.css";
import TopNav from "./topnav";

export default function App() {
  return (
    <HydrateClient>
      <TopNav />
      <Homepage />
    </HydrateClient>
  );
}
