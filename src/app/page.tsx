"use client";

import UICard from "./_components/UICard";
import EmblaCarousel from "./_components/Embla-Carousel";

import { useEffect, useState } from "react";
import { type TVStore, useTVStore } from "~/zustand/store";
import { type TVDB_Response, type TVDBShow } from "~/types";

export default function App() {
  const [newTV, setNewTV] = useState<TVDBShow[]>([]);
  const store = useTVStore() as TVStore;

  const tvdb_options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TVDB_TOKEN}`,
    },
  };

  useEffect(() => {
    fetch(
      "https://api4.thetvdb.com/v4/series/filter?country=usa&lang=eng",
      tvdb_options,
    )
      .then((response) => response.json() as Promise<TVDB_Response>)
      .then((data) => store.populate_tv_data(data.data as TVDBShow))
      .catch((err) => console.error("Could not populate TV Show Data: " + err))
      .finally(() => {
        sortNewTV();
        store.set_loading();
      });
  }, []);

  function sortNewTV() {
    const newTV = store.tv_data.sort(
      (
        a: { firstAired: string | number | Date },
        b: { firstAired: string | number | Date },
      ) => new Date(b.firstAired).getTime() - new Date(a.firstAired).getTime(),
    );
    setNewTV(newTV);
  }

  return (
    <div className="mt-3 flex flex-col gap-3">
      <UICard>
        <h4 className="text-xl font-bold text-white">Popular Shows</h4>
        <EmblaCarousel collection={store.tv_data} />
      </UICard>

      <UICard>
        <h4 className="text-xl font-bold text-white">Most Dangerous Shows</h4>
        <EmblaCarousel collection={store.tv_data} />
      </UICard>

      <UICard>
        <h4 className="text-xl font-bold text-white">Recent Reviewed Shows</h4>
        <EmblaCarousel collection={store.tv_data} />
      </UICard>
    </div>
  );
}
