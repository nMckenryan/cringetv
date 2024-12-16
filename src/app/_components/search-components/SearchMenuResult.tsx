import React from "react";
import Image from "next/image";
import { type TV_Show } from "~/types";
import Link from "next/link";

import noPoster from "../../../../public/noPoster.png";

export default function SearchResult({
  tv,
  clearSearch,
}: {
  tv: TV_Show;
  clearSearch: () => void;
}) {
  return (
    <Link
      key={tv.tvdb_id}
      className="flex flex-row items-center p-2 align-middle text-sm text-neutral-200 hover:bg-primary-blue-dark"
      href="/tv_show/[id]"
      as={`/tv_show/${tv.tvdb_id}`}
      onClick={() => {
        clearSearch();
      }}
    >
      <Image
        className="size-5 shrink-0 rounded-full"
        src={tv.poster_link ?? noPoster.src}
        alt={tv.name}
        width={40}
        height={40}
      />
      <p className="md:text-baseline text-sm text-gray-800 dark:text-neutral-200">
        {tv.name}
      </p>
      <small className="ms-auto text-xs text-gray-400 dark:text-neutral-500">
        {tv.first_air_date.getFullYear()}
      </small>
    </Link>
  );
}
