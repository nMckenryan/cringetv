"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  list_id: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function PaginationControls({
  list_id,
  hasNextPage,
  hasPrevPage,
}: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = 6;

  return (
    <div className="flex gap-2">
      <div className="join">
        <button
          className="btn join-item bg-primary-blue disabled:bg-primary-blue-dark"
          disabled={!hasPrevPage}
          onClick={() => {
            router.push(`/reviews/${list_id}?page=${Number(page) - 1}`);
          }}
        >
          «
        </button>

        <button className="btn join-item">
          {page} / {Math.ceil(10 / Number(per_page))}
        </button>

        <button
          className="btn join-item bg-primary-blue disabled:bg-primary-blue-dark"
          disabled={!hasNextPage}
          onClick={() => {
            router.push(`/reviews/${list_id}?page=${Number(page) + 1}`);
          }}
        >
          »
        </button>
      </div>
    </div>
  );
}
