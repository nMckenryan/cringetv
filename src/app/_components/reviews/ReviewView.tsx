import React from "react";
import { type Review } from "~/types";
import RatingIcon from "../RatingIcon";
import Image from "next/image";
import { CircleHelp } from "lucide-react";

import { api } from "~/trpc/server";

export default function ReviewView({ review }: { review: Review }) {
  const user = api.users.getUser(review.userId);
  return (
    <div
      className="card w-full bg-primary-blue-light shadow-xl"
      key={review.review_id}
    >
      <div className="card-body items-center text-center">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between gap-3">
            <RatingIcon reviewScore={review.cringe_score_vote} />
          </div>

          <div className="rounded-full shadow-lg">
            {user?.image ? (
              <Image
                src={user.image ?? ""}
                alt="profile_pic"
                className="rounded-full shadow-md"
                width={40}
                height={40}
              />
            ) : (
              <>
                <CircleHelp size={40} />
              </>
            )}
          </div>
          <p>{user?.name ?? "Unknown User"}</p>

          <p className="text-left text-sm">{review.review_content}</p>
        </div>
      </div>
    </div>
  );
}
