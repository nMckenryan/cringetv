import React from "react";
import UICard from "~/app/_components/UICard";
import Image from "next/image";

import ReviewList from "~/app/_components/reviews/ReviewList";
import ReviewForm from "~/app/_components/reviews/Review-Form";
import { type Review, type TV_Show } from "~/types";
import noPoster from "../../../../public/noPoster.png";
import RatingIcon from "~/app/_components/RatingIcon";
import TVShowCard from "~/app/_components/TVShowCard";

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

const review1: Review = {
  review_id: 1,
  review_content:
    "I loved watching The Office with my family. The characters are so relatable and the humor is spot on. I especially loved the episode  where Michael does the 'Dundies' at the Chili's. It's a classic!",
  userId: "1",
  tvdb_id: 1,
  cringe_score_vote: 4.0,
  review_rating: 5,
};

const review2: Review = {
  review_id: 2,
  review_content:
    "I didn't really like The Office. It's just not my kind of humor. I found the characters to be pretty annoying.",
  userId: "2",
  tvdb_id: 1,
  cringe_score_vote: 0.1,
  review_rating: 1,
};

const review3: Review = {
  review_id: 3,
  review_content:
    "I thought The Office was just okay. I liked some of the characters but others were just too much.",
  userId: "3",
  tvdb_id: 1,
  cringe_score_vote: 2.0,
  review_rating: 3,
};

const review4: Review = {
  review_id: 4,
  review_content:
    "The Office is my favorite show. I've seen it so many times but it never fails to make me laugh. Steve Carell is a genius.",
  userId: "4",
  tvdb_id: 1,
  cringe_score_vote: 1.0,
  review_rating: 5,
};

const reviewList = [review1, review2, review3, review4];

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
            <TVShowCard show={show} />

            <div className="flex flex-col py-4">
              <h1 className="text-lg font-bold">Description</h1>
              <p className="text-baseline whitespace-pre-wrap">
                {show.description}
              </p>
            </div>

            <ReviewForm tvId={"1"} />
          </div>
        </UICard>

        <ReviewList reviewList={reviewList} />
      </main>
    </>
  );
}
