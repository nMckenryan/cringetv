import React from "react";
import { db } from "~/server/db";
import UICard from "~/app/_components/UICard";
import NotFound from "~/app/not-found";
import ReviewList from "~/app/_components/reviews/ReviewList";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await db.user.findUnique({ where: { id: params.id } });

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
        <p>Member since: </p>
        <p>
          Reviews:
          {/* {user?.reviews} */}
        </p>
      </UICard>

      <ReviewList />
    </main>
  );
}
