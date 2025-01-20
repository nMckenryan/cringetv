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

export default async function ReviewListPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const show = await api.tvShows.getTVShowById((await params).id);

  const reviewList: Review[] = show?.reviews ?? [];

  if (!show) return <NotFound />;

  return (
    <>
      <UICard>
        <BackButton className="absolute left-1 top-1 p-2" />{" "}
        <div
          id="tv-card-col1-image"
          className="relative flex flex-row items-center"
        >
          <Image
            src={show.poster_link ?? noPoster}
            alt={`${show.name} poster`}
            className="rounded-xl shadow-xl"
            width={100}
            height={100}
          />
          <div className="m-2 flex flex-col align-middle">
            <p>{show.name}</p>{" "}
            <p className="flex flex-row align-middle">
              {getRatingIcon(show.aggregate_cringe_rating)}
              {getRatingText(show.aggregate_cringe_rating)}
            </p>
            <p>Reviews: {show.reviews.length}</p>
          </div>
        </div>
      </UICard>
      <UICard>
        <ReviewList reviewList={reviewList} />
        {reviewList.length > 6 && (
          <Link
            className="btn btn-primary btn-sm"
            href={`/reviews/[id]`}
            rel="preload"
            as={`/reviews/${(await params).id}`}
          >
            View More
          </Link>
        )}
      </UICard>
    </>
  );
}
