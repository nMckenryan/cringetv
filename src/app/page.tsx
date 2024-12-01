import UICard from "./_components/UICard";
import EmblaCarousel from "./_components/Embla-Carousel";

import { type TVStore, useTVStore } from "~/zustand/store";
import { type TV_Show } from "~/types";

import { api } from "~/trpc/server";

export default function App() {
  const getAllTvShowsQuery = api.tvShows.getAllTvShows.useQuery() as TV_Show[];

  // function sortNewTV(tv_data: TV_Show[]): TV_Show[] {
  //   const newTV = tv_data.sort(
  //     (
  //       a: { first_air_date: string | number | Date },
  //       b: { first_air_date: string | number | Date },
  //     ) =>
  //       new Date(b.first_air_date).getTime() -
  //       new Date(a.first_air_date).getTime(),
  //   );
  //   return newTV;
  // }

  return (
    <div className="mt-3 flex flex-col gap-3">
      {/* <UICard>
        <h4 className="text-xl font-bold text-white">Popular Shows</h4>
        <EmblaCarousel collection={sortNewTV(getAllTvShowsQuery)} />
      </UICard> */}

      <UICard>
        <h4 className="text-xl font-bold text-white">Most Dangerous Shows</h4>
        <EmblaCarousel collection={getAllTvShowsQuery} />
      </UICard>

      <UICard>
        <h4 className="text-xl font-bold text-white">Recent Reviewed Shows</h4>
        <EmblaCarousel collection={getAllTvShowsQuery} />
      </UICard>
    </div>
  );
}
