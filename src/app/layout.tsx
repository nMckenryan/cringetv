import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import TopNav from "./topnav";
import { TRPCReactProvider } from "~/trpc/react";

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
          <TopNav />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
