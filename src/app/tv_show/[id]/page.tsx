import React from "react";
import UICard from "~/app/_components/UICard";
import Image from "next/image";
import Head from "next/head";
import ReviewList from "~/app/_components/reviews/ReviewList";

import ReviewForm from "~/app/_components/reviews/Review-Form";

export default function TVShowPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <>
      <Head>
        <meta property="og:title" name="TV Show" content="Page description" />
      </Head>
      <main className="mt-3 flex flex-col gap-3">
        <UICard>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <figure className="px-10 pt-10">
                <Image
                  src={"/profile.png"}
                  width={125}
                  height={250}
                  alt="placeholder"
                  className="rounded-xl shadow-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Review name</h2>
                <p>description goes here</p>
                <p>
                  country of origin{" "}
                  <span role="img" aria-label="Mexican flag">
                    {" "}
                  </span>
                </p>
                <p>Content Rating</p>
                <h2 className="card-title">
                  Cringe Score: 2.4
                  <img></img>
                </h2>
              </div>
            </div>
            <ReviewForm tvId={"1"} />
          </div>
        </UICard>

        <ReviewList />
      </main>
    </>
  );
}
