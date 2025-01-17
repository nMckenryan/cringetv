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
    <div className="flex w-full flex-row items-center px-0 lg:w-[50vw]">
      <BackButton className="absolute left-1 top-1 p-2" />{" "}
      <div
        id="tv-card-col1-image"
        className="aspect-poster relative mx-2 flex flex-col items-center"
      >
        <Image
          src={show.poster_link ?? noPoster}
          alt={`${show.name} poster`}
          className="rounded-xl shadow-xl"
          width={200}
          height={200}
        />
      </div>
      <div
        id="tv-card-top"
        className="w-lg flex flex-row flex-nowrap justify-around gap-5"
      >
        <div
          id="tv-card-col2-data"
          className="mb-2 flex w-2/5 flex-col text-sm lg:text-lg"
        >
          <p className="text-base font-bold md:text-lg">{show.name}</p>
          <p>
            {show.first_air_date.toLocaleString("en-US", {
              year: "numeric",
            })}

            {show.series_status === "Ended" ? " - " + finalDate : " - Present"}
          </p>
          <p>Status: {show.series_status}</p>

          <p>
            Country:&nbsp;
            {show.original_country == "Unknown" ? (
              "???"
            ) : (
              <Flag country={show.original_country.slice(0, -1)} />
            )}
          </p>

          {show.content_ratings ? (
            <p>
              {show.content_ratings
                .map((cr: ContentRating) => cr.content_rating)
                .join(" ") ?? ""}
            </p>
          ) : null}

          {show.genres ? (
            <p>{show.genres.map((g) => g.genre_name).join(" ")}</p>
          ) : null}

          <div className="mt-2 flex flex-row align-middle">
            {getRatingIcon(show.aggregate_cringe_rating)}
            <p className="ml-2 content-center align-middle">
              {getRatingText(show.aggregate_cringe_rating)}
            </p>
          </div>
        </div>
        <div id="tv-card-col2">
          <p
            id="tv-card-desc"
            className="my-2 max-w-lg text-pretty px-5 py-1 text-sm md:max-w-sm lg:text-lg"
          >
            {show.description ?? "No Description Available"}
          </p>
        </div>
      </div>
    </div>
  );
}
