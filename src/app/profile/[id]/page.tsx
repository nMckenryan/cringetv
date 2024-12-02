import React from "react";
import { db } from "~/server/db";
import UICard from "~/app/_components/UICard";
import NotFound from "~/app/not-found";
import Image from "next/image";

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

      <UICard>
        <h4 className="text-xl font-bold text-white">Reviews</h4>
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="flex flex-row">
            <figure className="px-10 pt-10">
              <Image
                src={"/profile.png"}
                width={125}
                height={250}
                alt="placeholder"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
        </div>
      </UICard>
    </main>
  );
}
