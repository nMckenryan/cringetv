"use client";

import Flag from "react-flagkit";
import React from "react";
import { type EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay, { type AutoplayOptionsType } from "embla-carousel-autoplay";
import { type TV_Show } from "~/types";
import noPoster from "../../../../public/noPoster.png";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./Embla-Carousel-Buttons";
import Link from "next/link";
import { getRatingIcon } from "../RatingIcon";

export default function EmblaCarousel({
  collection,
}: {
  collection: TV_Show[];
}) {
  const options: EmblaOptionsType = { dragFree: true, loop: true };
  const autoplayOptions: AutoplayOptionsType = {
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay(autoplayOptions),
  ]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return collection === undefined ? (
    <div className="embla skeleton mx-auto h-72 w-screen" />
  ) : collection.length > 0 ? (
    <div className="flex items-center">
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <div className="embla mx-auto w-screen text-2xl md:w-[50vw]">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {collection.map((tv: TV_Show) => {
              return (
                <div className="flex flex-col" key={tv.tvdb_id}>
                  <Link
                    rel="preload"
                    href="/tv_show/[id]"
                    as={`/tv_show/${tv.tvdb_id}`}
                    className={`card m-2 flex min-h-[30vw] min-w-[15vw] justify-end bg-cover bg-center font-semibold no-underline shadow-xl transition hover:bg-secondary-purple/50 md:min-h-[15vw] md:min-w-[10vw]`}
                    style={{
                      backgroundImage: `url(${
                        tv.poster_link ? `${tv.poster_link}` : noPoster.src
                      })`,
                    }}
                  >
                    <div className="badge badge-neutral absolute right-0 top-0">
                      {getRatingIcon(tv.aggregate_cringe_rating)}
                    </div>
                    <div className="flex flex-col bg-primary-blue/70 align-bottom">
                      <h2 className="card-title line-clamp-2 overflow-hidden text-balance text-xs text-white md:text-sm">
                        {tv.name}
                      </h2>

                      <div className="card-actions flex flex-row justify-end">
                        <div className="badge badge-neutral">
                          <p className="flex text-xs text-slate-50">
                            {tv.first_air_date.getFullYear()}&nbsp;
                            <Flag country={tv.original_country.slice(0, -1)} />
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
    </div>
  ) : (
    <div className="text-center text-xl">No records found</div>
  );
}
