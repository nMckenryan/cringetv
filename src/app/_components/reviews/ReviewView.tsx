"use client";

import React, { useEffect, useState } from "react";
import { type Review } from "~/types";

import { getUserById } from "~/app/actions";
import Image from "next/image";

import RatingIcon from "../RatingIcon";

import { CircleHelp } from "lucide-react";
import ReviewActionsBar from "./ReviewActionsBar";
export type UserDetails = {
  name: string | null;
  image: string | null;
};
export default function ReviewView({ review }: { review: Review }) {
  const [user, setUser] = useState<UserDetails>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(review.userId);
        setUser(user as UserDetails);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUser();
  }, [review.userId]);

  return (
    <div
      className="card w-full bg-primary-blue-light shadow-xl"
      key={review.review_id}
    >
      <div className="card-body items-center text-center">
        {isLoading ? (
          <span className="loading loading-bars loading-sm" />
        ) : (
          <>
            <ReviewActionsBar review={review} />
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between gap-3">
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
                    <CircleHelp className="rounded-full shadow-md" size={40} />
                  </>
                )}
                <p className="text-sm md:text-lg">
                  {user?.name ?? "Unknown User"}
                </p>
                <RatingIcon reviewScore={review.cringe_score_vote} />
              </div>

              <p className="text-left text-sm md:text-lg">
                {review.review_content}
              </p>
            </div>
          </>
        )}{" "}
      </div>
    </div>
  );
}
