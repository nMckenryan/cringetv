import React from "react";
import Head from "next/head";
import { db } from "~/server/db";
import UICard from "~/app/_components/UICard";
import NotFound from "~/app/not-found";

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
              <img src={user.image} alt="profile_pic" />
            </picture>
          </div>
        </div>
        <p>{user?.name}</p>
        <p>Member since: </p>
        <p>Reviews: {user?.reviews}</p>
      </UICard>

      <UICard>
        <h4 className="text-xl font-bold text-white">Reviews</h4>
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </UICard>
    </main>
  );
}
