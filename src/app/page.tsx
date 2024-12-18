import UICard from "./_components/UICard";
import EmblaCarousel from "./_components/carousel/Embla-Carousel";

import { type TV_Show_Basic } from "~/types";

import { api } from "~/trpc/server";
import { getRatingIcon } from "./_components/RatingIcon";

export default async function App() {
  const newTV: TV_Show_Basic[] = await api.tvShows.getNewestTvShows();
  const dangerousShows: TV_Show_Basic[] =
    await api.tvShows.getMostDangerousShows();

  return (
    <div className="mt-3 flex flex-col gap-3">
      <UICard>
        <div className="flex-grid flex">
          <>
            {getRatingIcon(0)} {getRatingIcon(0.5)}
          </>
          <>
            {getRatingIcon(0.75)} {getRatingIcon(1)}
          </>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <div>
            <h1 className="text-center text-lg font-bold">Safe for Home!</h1>
            <p className="text-center text-sm">
              Find shows safe to recommend to your parents
            </p>
          </div>
        </div>
      </UICard>

      <UICard>
        <h4 className="text-xl font-bold text-white">Newest Shows</h4>
        <EmblaCarousel collection={newTV} />
      </UICard>

      <UICard>
        <h4 className="text-xl font-bold text-white">Most Dangerous Shows</h4>
        <EmblaCarousel collection={dangerousShows} />
      </UICard>
    </div>
  );
}
