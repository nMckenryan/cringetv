import { type ContentRating, type TV_Show } from "~/types";
import RatingIcon from "./RatingIcon";
import Image from "next/image";
import noPoster from "../../../public/noPoster.png";

export default function TVShowCard({ show }: { show: TV_Show }) {
  console.log(show);
  return (
    <div className="flex flex-row">
      <Image
        src={noPoster}
        width={125}
        height={250}
        placeholder="blur"
        alt="placeholder"
        className="rounded-xl shadow-xl"
      />

      <div className="card-body items-center px-0">
        <h2 className="card-title text-wrap">
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
              Genre{show.genres.length > 1 ? "s: " : ": "}
              {show.genres.map((g) => g.genre_name).join(", ")}
            </p>
            <p>Country: {show.original_country}</p>

            {show.content_ratings.length > 0 && (
              <p>
                Content Rating:&nbsp;
                {show.content_ratings
                  .map((cr: ContentRating) => cr.content_rating)
                  .join(", ") ?? ""}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
