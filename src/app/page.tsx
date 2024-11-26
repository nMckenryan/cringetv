import { HydrateClient } from "~/trpc/server";
import Homepage from "./homepage";
import "../styles/embla.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <HydrateClient>
      <Homepage />
    </HydrateClient>
  );
}
