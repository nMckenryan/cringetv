import UICard from "./_components/UICard";
import EmblaCarousel from "./_components/carousel/Embla-Carousel";

import { type TV_Show } from "~/types";
import { Suspense } from "react";

import { api } from "~/trpc/server";

export default async function App() {
  const tvQuery: TV_Show[] = await api.tvShows.getNewestTvShows();
  const dangerousShows: TV_Show[] = await api.tvShows.getMostDangerousShows();

  return (
    <div className="mt-3 flex flex-col gap-3">
      <Suspense fallback={<div>Loading...</div>}>
        <UICard>
          <h4 className="text-xl font-bold text-white">Newest Shows</h4>
          <EmblaCarousel collection={tvQuery.slice(0, 10)} />
        </UICard>
      </Suspense>

      <UICard>
        <h4 className="text-xl font-bold text-white">Most Dangerous Shows</h4>
        <EmblaCarousel collection={dangerousShows} />
      </UICard>
    </div>
  );
}
