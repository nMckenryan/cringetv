"use client";

import React from "react";
import UICard from "~/app/_components/UICard";

import EditBio from "~/app/_components/EditBio";
import ReviewList from "~/app/_components/reviews/ReviewList";
import BackButton from "~/app/_components/BackButton";

import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import { type ReviewViewTypeExtended } from "~/types";

export default function ProfilePage() {
  const params = useParams();
  const userID = params.id as string;

  const user = api.users.getUserById.useQuery({
    userId: userID,
  }).data;

  const { data: reviews, isLoading } =
    api.reviews.getReviewListFromUserId.useQuery({
      userId: userID,
    }) as { data: ReviewViewTypeExtended[]; isLoading: boolean };

  if (isLoading) return <span>Loading...</span>;

  return (
    <main className="mt-3 flex flex-col gap-3">
      <UICard>
        <BackButton className="absolute left-1 top-1" />
        <div className="avatar">
          <div className="w-24 rounded-full">
            <picture>
              <img src={user?.image ?? "none"} alt="profile_pic" />
            </picture>
          </div>
        </div>
        <p>{user?.name}</p>
        <p className="text-sm">
          Account Created: {user?.dateCreated.toLocaleDateString("en-au")}
        </p>
        <p className="w-72 text-wrap break-all text-center text-sm">
          Bio: {user?.userBio ?? "No bio provided"}
        </p>
        <EditBio user={user!} />

        <ReviewList reviewList={reviews} />
      </UICard>
    </main>
  );
}
