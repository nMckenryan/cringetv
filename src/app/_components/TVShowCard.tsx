import { type TV_Show } from "~/types";
import RatingIcon from "./RatingIcon";
import Image from "next/image";
import noPoster from "../../../public/noPoster.png";

export default function TVShowCard({ show }: { show: TV_Show }) {
  return (
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
              <p>
                Content Rating:
                {show.content_rating.map((cr) => cr.name).join(", ") ?? ""}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
