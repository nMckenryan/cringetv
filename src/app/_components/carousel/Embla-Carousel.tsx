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
import Image from "next/image";
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
    <div
      id="placeholder-carousel"
      className="embla skeleton mx-auto h-72 w-screen md:w-[70vw]"
    />
  ) : collection.length > 0 ? (
    <div id="carousel-full" className="flex items-center">
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <div className="embla mx-auto w-screen text-2xl md:w-[70vw]">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {collection.map((tv: TV_Show) => {
              return (
                <div className="flex flex-col" key={tv.tvdb_id}>
                  <Link
                    rel="preload"
                    href="/tv_show/[id]"
                    as={`/tv_show/${tv.tvdb_id}`}
                    className={`card relative m-2 flex min-h-[50vw] min-w-[40vw] justify-end font-semibold no-underline shadow-xl transition hover:bg-secondary-purple/50 md:min-h-[25vw] md:min-w-[15vw]`}
                  >
                    <Image
                      src={tv.poster_link ?? noPoster.src}
                      alt={`${tv.name} poster`}
                      fill
                      sizes="(max-width: 768px) 40vw, 15vw"
                      className="object-cover"
                      priority
                    />
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
