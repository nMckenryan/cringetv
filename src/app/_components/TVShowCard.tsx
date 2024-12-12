import { type ContentRating, type TV_Show } from "~/types";
import { getRatingIcon, getRatingText } from "./RatingIcon";
import Image from "next/image";
import noPoster from "../../../public/noPoster.png";
import Flag from "react-flagkit";

export default function TVShowCard({ show }: { show: TV_Show }) {
  return (
    <div className="flex flex-col items-center px-0">
      <div id="tv-card-top" className="w-lg flex flex-row justify-around gap-5">
        <div className="flex flex-col items-center">
          <h2 className="text-baseline text-pretty font-bold">{show.name}</h2>
          <Image
            src={show.poster_link || noPoster}
            width={100}
            height={150}
            alt={`${show.name} poster`}
            className="rounded-xl shadow-xl"
          />
          <div className="flex flex-row align-middle">
            {getRatingIcon(show.aggregate_cringe_rating, 30)}
            <p className="content-center align-middle text-sm">
              {getRatingText(show.aggregate_cringe_rating)}
            </p>
          </div>
        </div>

        <div className="mb-2 flex flex-col gap-0 text-sm">
          <p className="text-base">
            {show.first_air_date.toLocaleString("en-US", {
              year: "numeric",
            })}

            {show.series_status === "Ended"
              ? " - " +
                show.final_air_date.toLocaleString("en-US", {
                  year: "numeric",
                })
              : ""}
          </p>
          <p>Status: {show.series_status}</p>
          <p>{show.genres.map((g) => g.genre_name).join(", ")}</p>
          <p>
            Country: &nbsp;
            <Flag country={show.original_country.slice(0, -1)} />
          </p>

          {show.content_ratings.length > 0 && (
            <p>
              {show.content_ratings
                .map((cr: ContentRating) => cr.content_rating)
                .join(", ") ?? ""}
            </p>
          )}
        </div>
      </div>
      <p
        id="tv-card-desc"
        className="my-2 max-w-lg text-pretty px-5 py-1 text-sm"
      >
        {show.description ?? "No Description Available"}
      </p>
    </div>
  );
}
