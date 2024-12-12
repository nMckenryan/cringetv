import React from "react";
import { db } from "~/server/db";
import UICard from "~/app/_components/UICard";
import NotFound from "~/app/not-found";

import EditBio from "~/app/_components/EditBio";
import ReviewList from "~/app/_components/reviews/ReviewList";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await db.user.findUnique({ where: { id: (await params).id } });

  const reviews = await db.review.findMany({
    where: {
      userId: (await params).id,
    },
  });

  if (!user) {
    return <NotFound />;
  }

  return (
    <main className="mt-3 flex flex-col gap-3">
      <UICard>
        <div className="avatar">
          <div className="w-24 rounded-full">
            <picture>
              <img src={user.image ? user.image : "none"} alt="profile_pic" />
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
        <EditBio user={user} />

        <ReviewList reviewList={reviews} />
      </UICard>
    </main>
  );
}
