import React from "react";
import { auth } from "~/server/auth";
import { type Review } from "~/types";

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
            <div className="flex flex-row justify-between gap-1">
              <div className="avatar">
                <div className="w-5 rounded-full shadow-lg">
                  <picture>
                    <img src={"none"} alt="profile_pic" />
                  </picture>
                </div>

                <h2 className="card-title text-sm">{user?.user.name}</h2>
              </div>
              <span role="img" aria-label="smiley">
                😊
              </span>
            </div>

            <p className="text-left text-sm">{review.review_content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
