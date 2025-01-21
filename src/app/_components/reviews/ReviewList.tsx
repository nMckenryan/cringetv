import ReviewView from "./ReviewView";
import { type ReviewViewType } from "~/types";

export default function ReviewList({
  reviewList,
}: {
  reviewList: ReviewViewType[];
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      {reviewList.length === 0 ? (
        <p className="p-10 text-center text-lg">No Reviews Yet.</p>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <div className="grid w-[90vw] grid-cols-1 gap-1 sm:grid-cols-2 md:w-full">
            {reviewList.map((rev) => (
              <ReviewView review={rev} key={rev.review_id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
