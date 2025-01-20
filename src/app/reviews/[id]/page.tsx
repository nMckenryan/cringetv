import UICard from "~/app/_components/UICard";
import Image from "next/image";
import NotFound from "~/app/not-found";
import noPoster from "../../../../public/noPoster.png";

import { api } from "~/trpc/server";
import { type Review } from "~/types";
import BackButton from "~/app/_components/BackButton";
import { getRatingIcon, getRatingText } from "~/app/_components/RatingIcon";
import ReviewList from "~/app/_components/reviews/ReviewList";
import Link from "next/link";
import PaginationControls from "./PaginationControls";
import ReviewView from "~/app/_components/reviews/ReviewView";

export default async function ReviewListPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const show = await api.tvShows.getTVShowById((await params).id);

  const reviewList: Review[] = show?.reviews ?? [];

  if (!show) return <NotFound />;

  const page = searchParams.page ?? "1";
  const per_page = 6;

  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + per_page;

  const entries = reviewList.slice(start, end);

  return (
    <>
      <UICard>
        <BackButton className="absolute left-1 top-1 p-2" />{" "}
        <div
          id="tv-card-col1-image"
          className="relative flex flex-row items-center justify-items-stretch"
        >
          <Image
            src={show.poster_link ?? noPoster}
            alt={`${show.name} poster`}
            className="rounded-xl shadow-xl"
            width={50}
            height={50}
          />
          <div className="m-2 flex flex-col align-middle">
            <p>{show.name}</p>
            <p className="flex flex-row items-center justify-center gap-1 align-middle">
              Average Rating:
              {getRatingIcon(show.aggregate_cringe_rating)}
              {getRatingText(show.aggregate_cringe_rating)}
            </p>
            <p>Reviews: {show.reviews.length}</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="grid w-[90vw] grid-cols-1 gap-1 sm:grid-cols-2 md:w-full">
            {entries.map((rev) => (
              <ReviewView review={rev} key={rev.review_id} />
            ))}
          </div>
        </div>
        <PaginationControls
          show_id={(await params).id}
          hasNextPage={end < reviewList.length}
          hasPrevPage={start > 0}
        />
      </UICard>
    </>
  );
}
