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
    <div className="embla skeleton mx-auto h-72 w-screen" />
  ) : collection.length > 0 ? (
    <div className="flex items-center">
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <div className="embla mx-auto text-4xl">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {collection.map((tv: TVDBShow, index: number) => (
              <div className="flex flex-col" key={index}>
                <Link
                  className="card flex justify-end font-semibold no-underline shadow-xl transition hover:bg-secondary-purple/50"
                  style={{
                    backgroundImage: `url(${tv.image ? tv.image : noPoster.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    margin: "2px",
                    minWidth: window.screen.width > 768 ? 200 : 125,
                    minHeight: window.screen.width > 768 ? 400 : 250,
                  }}
                  href={`tv_show/${tv.id}`}
                >
                  <div className="flex flex-col bg-primary-blue/60 align-bottom">
                    <h2 className="card-title text-sm text-white">{tv.name}</h2>
                    <p className="line-clamp-3 hidden text-sm font-normal text-white">
                      {tv.overview ? tv.overview : "No Description Available"}
                    </p>
                    <div className="card-actions justify-end">
                      <div className="badge badge-secondary">
                        {tv.originalLanguage}
                      </div>
                      <div className="badge badge-secondary">{tv.year}</div>
                    </div>
                  </div>
                </Link>
              </div>
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
