import { type ContentRating, type TV_Show } from "~/types";
import { getRatingIcon, getRatingText } from "./RatingIcon";
import Image from "next/image";
import noPoster from "../../../public/noPoster.png";
import Flag from "react-flagkit";
import BackButton from "./BackButton";

export default function TVShowCard({ show }: { show: TV_Show }) {
  const finalDate: string = show.last_air_date
    ? show.last_air_date.toLocaleString("en-US", {
        year: "numeric",
      })
    : "";

  return (
    <div className="flex flex-col items-center px-0 lg:flex-row">
      <BackButton className="absolute left-1 top-1" />
      <div id="tv-card-top" className="w-lg flex flex-row justify-around gap-5">
        <div className="flex flex-col items-center">
          <Image
            src={show.poster_link ?? noPoster}
            width={100}
            height={150}
            alt={`${show.name} poster`}
            className="rounded-xl shadow-xl"
          />

          <div className="flex flex-row align-middle">
            {getRatingIcon(show.aggregate_cringe_rating)}
            <p className="content-center align-middle text-sm">
              {getRatingText(show.aggregate_cringe_rating)}
            </p>
          </div>
        </div>

        <div className="mb-2 flex flex-col gap-0 text-sm">
          <p className="text-base font-bold md:text-lg">{show.name}</p>
          <p className="text-base md:text-lg">
            {show.first_air_date.toLocaleString("en-US", {
              year: "numeric",
            })}

            {show.series_status === "Ended" ? " - " + finalDate : " - Present"}
          </p>
          <p className="text-base md:text-lg">Status: {show.series_status}</p>

          <p className="text-base md:text-lg">
            Country:&nbsp;
            <Flag country={show.original_country.slice(0, -1)} />
          </p>

          {show.content_ratings ? (
            <p className="text-base md:text-lg">
              {show.content_ratings
                .map((cr: ContentRating) => cr.content_rating)
                .join(" ") ?? ""}
            </p>
          ) : null}

          {show.genres ? (
            <p className="text-base md:text-lg">
              {show.genres.map((g) => g.genre_name).join(" ")}
            </p>
          ) : null}
        </div>
      </div>
      <p
        id="tv-card-desc"
        className="text-ms my-2 max-w-lg text-pretty px-5 py-1 md:max-w-sm md:text-lg"
      >
        {show.description ?? "No Description Available"}
      </p>
    </div>
  );
}
