"use client";

import UICard from "./_components/UICard";
import EmblaCarousel from "./_components/Embla-Carousel";
import { TVDB_Response, useTVStore } from "~/zustand/store";
import { useEffect } from "react";

export default function Homepage() {
  const store = useTVStore();

  const tvdb_options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TVDB_TOKEN}`,
    },
  };

  useEffect(() => {
    fetch("https://api4.thetvdb.com/v4/series", tvdb_options)
      .then((response) => response.json() as Promise<TVDB_Response>)
      .then((data) => store.populate_tv_data(data.data))
      .catch((err) => console.error(err))
      .finally(() => store.set_loading(false));
  }, []);

  return (
    <main className="bg-background-black flex min-h-screen flex-col items-center justify-center text-white">
      <div className="flex flex-col gap-1">
        <UICard>
          <EmblaCarousel />
        </UICard>
      </div>
    </main>
  );
}
