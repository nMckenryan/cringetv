import "~/styles/globals.css";
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"
/>;
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";

import { HydrateClient } from "~/trpc/server";
import "../styles/embla.css";
import TopNav from "./_components/TopNav";
import Footer from "./_components/Footer";

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
            <main className="justify-top my-3 flex min-h-screen flex-col items-center gap-3 bg-background-black text-white">
              {children}
            </main>
            <Footer />
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
