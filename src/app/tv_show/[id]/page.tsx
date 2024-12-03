import React from "react";
import UICard from "~/app/_components/UICard";
import Image from "next/image";
import Head from "next/head";
import ReviewList from "~/app/_components/reviews/ReviewList";

import ReviewForm from "~/app/_components/reviews/Review-Form";
import { type TV_Show } from "~/types";
import noPoster from "../../../../public/noPoster.png";
import RatingIcon from "~/app/_components/RatingIcon";

const show: TV_Show = {
  name: "The Office",
  description: "The best show ever",
  content_rating: [
    {
      id: 1,
      name: "G",
      country: "USA",
      description: "No description available",
      contentType: null,
      order: null,
      fullName: null,
    },
  ],
  aggregate_cringe_rating: 2.4,
  reviews: [],
  first_air_date: new Date("2/4/2004"),
  final_air_date: new Date(),
  series_status: "Ended",
  poster_link:
    "https://m.media-amazon.com/images/M/MV5BZjA0YjUzYTAtYmQyOS00NjI3LTg1YmQtZmI3NTFhZGRlNjE0XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
  tvdb_id: 0,
  genre: [
    {
      id: 0,
      name: "Comedy",
    },
  ],
  original_country: "USA",
};

export default function TVShowPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <>
      <main className="mt-3 flex flex-col gap-3">
        <UICard>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <Image
                src={noPoster}
                width={125}
                height={250}
                alt="placeholder"
                className="rounded-xl shadow-xl"
              />

              <div className="card-body items-center">
                <h2 className="card-title">
                  {show.name} (
                  {show.first_air_date.toLocaleString("en-US", {
                    year: "numeric",
                  })}
                  )
                </h2>
                <div className="flex flex-row items-center justify-center gap-2">
                  <div className="flex flex-col">
                    <h2 className="card-title">
                      <RatingIcon reviewScore={show.aggregate_cringe_rating} />
                    </h2>
                  </div>
                  <div className="flex flex-col">
                    <p>
                      Status: {show.series_status}{" "}
                      {show.series_status === "Ended"
                        ? show.final_air_date.toLocaleString("en-US", {
                            year: "numeric",
                          })
                        : ""}
                    </p>
                    <p>
                      Genre{show.genre.length > 1 ? "s: " : ": "}
                      {show.genre.map((g) => g.name).join(", ")}
                    </p>
                    <p>Country: {show.original_country}</p>
                    {show.content_rating.length > 0 && (
                      <p>Content Rating: {show.content_rating[0].name ?? ""}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col py-4">
              <h1 className="text-lg font-bold">Description</h1>
              <p className="text-baseline whitespace-pre-wrap">
                {show.description}
              </p>
            </div>

            <ReviewForm tvId={"1"} />
          </div>
        </UICard>

        <ReviewList />
      </main>
    </>
  );
}
