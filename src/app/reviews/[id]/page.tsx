import UICard from "~/app/_components/UICard";
import NotFound from "~/app/not-found";
import noPoster from "../../../../public/noPoster.png";
import Image from "next/image";

import BackButton from "~/app/_components/BackButton";
import { getRatingIcon, getRatingText } from "~/app/_components/RatingIcon";
import PaginationControls from "./PaginationControls";
import ReviewView from "~/app/_components/reviews/ReviewView";
import { type SearchParams } from "next/dist/server/request/search-params";
import { getReviewListFromTVIDForReviewListPage } from "~/app/actions";
import Link from "next/link";

export default async function ReviewListPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string | number }>;
  searchParams: Promise<SearchParams>;
}) {
  const id = String((await params).id);
  const searchParamsResolved = await searchParams;

  const reviewList =
    (await getReviewListFromTVIDForReviewListPage(Number(id))) ?? [];

  const showInformation = reviewList[0]?.televisionShow;

  if (!reviewList || !showInformation) {
    return <NotFound />;
  }

  const page = Number(searchParamsResolved.page) || 1;
  const per_page = 6;

  //START AND END OF PAGINATION LIST
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = reviewList.slice(start, end);

  if (page > end) {
    return <NotFound />;
  }

  return (
    <>
      <UICard>
        <BackButton className="absolute left-1 top-1 p-2" />{" "}
        <div
          id="tv-card-col1-image"
          className="relative flex flex-row items-center justify-items-stretch"
        >
          <Link href={`/tv_show/${id}`}>
            <Image
              src={showInformation.poster_link ?? noPoster}
              alt={`${showInformation.name} poster`}
              className="rounded-xl shadow-xl"
              width={50}
              height={50}
            />
          </Link>
          <div className="m-2 flex flex-col align-middle">
            <p>{showInformation.name}</p>
            <p className="flex flex-row items-center justify-center gap-1 align-middle">
              Average Rating:
              {getRatingIcon(showInformation.aggregate_cringe_rating)}
              {getRatingText(showInformation.aggregate_cringe_rating)}
            </p>
            <p>Reviews: {reviewList.length}</p>
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
          list_id={id}
          hasNextPage={end < reviewList.length}
          hasPrevPage={start > 0}
        />
      </UICard>
    </>
  );
}
