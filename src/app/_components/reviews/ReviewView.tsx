import React from "react";
import { auth } from "~/server/auth";
import { type Review } from "~/types";
import RatingIcon from "../RatingIcon";
import Image from "next/image";

export default async function ReviewView({ review }: { review: Review }) {
  const user = await auth();

  //   TODO: GET USER INFOR FROM TRPC
  return (
    <div
      className="card w-96 bg-primary-blue-light shadow-xl"
      key={review.review_id}
    >
      <div className="flex flex-row">
        <div className="card-body items-center text-center">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="rounded-full shadow-lg">
                <Image
                  src={user?.user.image ? user?.user.image : "none"}
                  alt="profile_pic"
                  className="rounded-full shadow-md"
                  width={40}
                  height={40}
                />
              </div>

              <h2 className="card-title text-sm">{user?.user.name}</h2>

              <RatingIcon reviewScore={5.0} />
            </div>

            <p className="text-left text-sm">{review.review_content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
