import React from "react";
import { type Review } from "~/types";
import RatingIcon from "../RatingIcon";
import Image from "next/image";
import { CircleHelp } from "lucide-react";

export default function ReviewView({ review }: { review: Review }) {
  const user = null;

  //   TODO: GET USER INFOR FROM TRPC
  return (
    <div
      className="card w-full bg-primary-blue-light shadow-xl"
      key={review.review_id}
    >
      <div className="flex flex-row">
        <div className="card-body items-center text-center">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="rounded-full shadow-lg">
                {user?.user?.image ? (
                  <Image
                    src={(user.user.image as string) ?? ""}
                    alt="profile_pic"
                    className="rounded-full shadow-md"
                    width={40}
                    height={40}
                  />
                ) : (
                  <CircleHelp size={40} />
                )}
              </div>

              <h2 className="card-title text-sm">
                {user?.user.name as string}
              </h2>

              <RatingIcon reviewScore={review.cringe_score_vote} />
            </div>

            <p className="text-left text-sm">{review.review_content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
