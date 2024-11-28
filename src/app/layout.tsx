import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import TopNav from "./topnav";
import { HydrateClient } from "~/trpc/server";
import "../styles/embla.css";

export const metadata: Metadata = {
  title: "BingeCringe",
  description: "Find TV Series safe to watch with your parents/kids",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <HydrateClient>
            <TopNav />
            <main className="justify-top flex min-h-screen flex-col items-center bg-background-black text-white">
              {children}
            </main>
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
