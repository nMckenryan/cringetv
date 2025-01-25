import { type ReviewViewTypeExtended } from "~/types";

import Image from "next/image";

import RatingIcon from "../RatingIcon";

import { CircleHelp } from "lucide-react";
import ReviewActionsBar from "./ReviewActionsBar";

import { getSession } from "~/app/actions";

export default async function ReviewView({
  review,
}: {
  review: ReviewViewTypeExtended;
}) {
  const session = await getSession();

  return (
    <div
      className="card h-full w-full bg-primary-blue-light pt-3 shadow-xl"
      key={review.review_id}
    >
      <div className="card-body h-full items-center text-center">
        <>
          {session?.user.id == review.user.id ? (
            <ReviewActionsBar review={review} />
          ) : null}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between gap-3">
              {review.user.image ? (
                <Image
                  src={review.user.image}
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
                <p className="text-baseline text-left">
                  {review.user?.name ? review.user.name : "Unknown User"}
                </p>
                <p className="md:text-baseline text-left text-xs">
                  {review.televisionShow?.name
                    ? review.televisionShow.name
                    : "???"}
                </p>
              </div>
              <RatingIcon reviewScore={review.cringe_score_vote} />
            </div>

            <p className="md:text-baseline text-left text-xs">
              {review.review_content}
            </p>
          </div>
        </>
      </div>
    </div>
  );
}
