import React from "react";
import { type EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay, { AutoplayOptionsType } from "embla-carousel-autoplay";
import Image from "next/image";
import { type TVDBShow } from "~/types";
import { type TVStore, useTVStore } from "~/zustand/store";
import noPoster from "../../../public/noPoster.png";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./Embla-Carousel-Buttons";
import Link from "next/link";

export default function EmblaCarousel({
  collection,
}: {
  collection: TVDBShow[];
}) {
  const store = useTVStore() as TVStore;
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

  return store.loading == true ? (
    <div className="embla skeleton mx-auto h-36 w-1/2">
      {/* <CircleLoader
        color={"#FFD700"}
        style={{ backgroundColor: "transparent" }}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> */}
    </div>
  ) : collection.length > 0 ? (
    <div className="flex">
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <div className="embla mx-auto text-4xl">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {collection.map((tv: TVDBShow, index: number) => (
              <Link
                className="0 bg-primary-blue-light card py-3 font-semibold no-underline shadow-xl transition hover:bg-secondary-purple/50"
                // className="bg-primary-blue-light hover:bg-blue-light/50 card shadow-xl"
                key={index}
                style={{ margin: "2px", minWidth: "300px", minHeight: "550px" }}
                href={""}
              >
                <figure>
                  <Image
                    className="rounded-lg pt-3"
                    src={tv.image ? tv.image : noPoster}
                    // src={tv.image ? `https://thetvdb.com${tv.image}` : noPoster}
                    width={200}
                    height={300}
                    alt={`${tv.name}_poster`}
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
              </Link>
            ))}
          </div>
        </div>
      </div>
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
    </div>
  ) : (
    <div className="text-center text-xl">No records found</div>
  );
}
