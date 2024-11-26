import React, { useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { TVDBShow, useTVStore } from "../../zustand/store";
import Image from "next/image";
import CircleLoader from "react-spinners/CircleLoader";

export default function EmblaCarousel() {
  const store = useTVStore();

  const options: EmblaOptionsType = { dragFree: true, loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const newTV: TVDBShow[] = store.tv_data
    .sort(
      (
        a: { firstAired: string | number | Date },
        b: { firstAired: string | number | Date },
      ) => new Date(b.firstAired).getTime() - new Date(a.firstAired).getTime(),
    )
    .slice(0, 10);

  return store.loading == true ? (
    <CircleLoader
      color={"#FFD700"}
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  ) : (
    <div className="embla mx-auto text-4xl">
      <h1 className="pb-4 text-4xl">Popular Shows</h1>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {newTV.map((tv: TVDBShow, index: number) => (
            <div key={index}>
              <div
                className="card bg-base-100 shadow-xl"
                style={{ margin: "2px", minWidth: "200px", minHeight: "550px" }}
              >
                <figure>
                  <Image
                    src={"https://thetvdb.com" + tv.image}
                    width={200}
                    height={300}
                    alt={tv.name + "_poster"}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-white">
                    {tv.name}
                    <div className="badge badge-secondary">
                      {tv.originalLanguage}
                    </div>
                  </h2>
                  <p className="line-clamp-3 text-sm text-white">
                    {tv.overview ? tv.overview : "No Description Available"}
                  </p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-secondary">{tv.year}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
