import { type ReviewViewType } from "~/types";

import Image from "next/image";

import RatingIcon from "../RatingIcon";

import { CircleHelp } from "lucide-react";
import ReviewActionsBar from "./ReviewActionsBar";

export default function ReviewView({ review }: { review: ReviewViewType }) {
  return (
    <div
      className="card w-full bg-primary-blue-light pt-3 shadow-xl"
      key={review.review_id}
    >
      <div className="card-body items-center text-center">
        <>
          <ReviewActionsBar review={review} />
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between gap-3">
              {review.user.image ? (
                <Image
                  src={review.user.image ?? ""}
                  alt="profile_pic"
                  className="rounded-full shadow-md"
                  width={40}
                  height={40}
                />
              ) : (
                <>
                  <CircleHelp className="rounded-full shadow-md" size={40} />
                </>
              )}
              <div className="flex flex-col">
                <p className="text-sm md:text-lg">
                  {review.user?.name ?? "Unknown User"}
                </p>
                <p className="text-xs md:text-sm">
                  {review.televisionShow.name ?? "???"}
                </p>
              </div>
              <RatingIcon reviewScore={review.cringe_score_vote} />
            </div>

            <p className="text-left text-sm md:text-lg">
              {review.review_content}
            </p>
          </div>
        </>
      </div>
    </div>
  );
}
