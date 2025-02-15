"use client";

import Flag from "react-flagkit";
import React from "react";
import { type EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay, { type AutoplayOptionsType } from "embla-carousel-autoplay";
import { type TV_Show_Basic } from "~/types";
import noPoster from "../../../../public/noPoster.png";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./Embla-Carousel-Buttons";
import Link from "next/link";
import Image from "next/image";
import { getRatingIcon } from "../RatingIcon";

export default function EmblaCarousel({
  collection,
}: {
  collection: TV_Show_Basic[];
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
    <div
      id="placeholder-carousel"
      className="embla skeleton mx-auto h-72 w-[90vw] md:w-[50vw]"
    />
  ) : collection.length > 0 ? (
    <div id="carousel-full" className="flex items-center">
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <div className="embla mx-auto w-[80vw] text-2xl md:w-[50vw]">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {collection.map((tv: TV_Show_Basic) => {
              return (
                <div className="flex flex-col" key={tv.tvdb_id}>
                  <Link
                    rel="preload"
                    href="/tv_show/[id]"
                    as={`/tv_show/${tv.tvdb_id}`}
                    className={`card relative m-2 flex min-h-[40vw] min-w-[20vw] justify-end font-semibold no-underline shadow-xl transition hover:bg-secondary-purple/50 sm:min-h-[20vw] sm:min-w-[10vw]`}
                  >
                    <div className="absolute right-0 top-0 z-10 m-0 rounded-full bg-slate-900 p-0 shadow-lg">
                      {getRatingIcon(tv.aggregate_cringe_rating)}
                    </div>
                    <Image
                      src={tv.poster_link ?? noPoster.src}
                      alt={`${tv.name} poster`}
                      fill
                      sizes="(max-width: 768px) 40vw, 15vw"
                      className="z-0 object-cover"
                      priority
                    />

                    <div className="z-10 flex flex-col bg-primary-blue/70 align-bottom">
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
