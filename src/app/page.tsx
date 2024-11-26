import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import UICard from "./_components/UICard";
import EmblaCarousel from "./_components/Embla-Carousel";

export default async function Home() {
  // const store = useTVStore();

  const tvdb_options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TVDB_TOKEN}`,
    },
  };

  // useEffect(() => {
  //   fetch("https://api4.thetvdb.com/v4/series", tvdb_options)
  //     .then((response) => response.json() as Promise<TVDB_Response>)
  //     .then((data) => {
  //       store.populate_tv_data(data.data);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <HydrateClient>
      {/* <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16"> */}
      <main className="bg-background-black flex min-h-screen flex-col items-center justify-center text-white">
        <div className="flex flex-col gap-1">
          {/* <UICard>
            <EmblaCarousel />
          </UICard> */}
        </div>
      </main>
    </HydrateClient>
  );
}
