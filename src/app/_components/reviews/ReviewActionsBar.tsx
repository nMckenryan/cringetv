"use client";

import { Edit, Trash } from "lucide-react";
import { Modal } from "../Modal";
import ReviewForm from "./ReviewForm";
import { api } from "~/trpc/react";
import { type ReviewViewTypeExtended } from "~/types";

export default function ReviewActionsBar({
  review,
}: {
  review: ReviewViewTypeExtended;
}) {
  const session = api.users.me.useQuery();
  const { mutate } = api.reviews.deleteReview.useMutation();

  const updateAvgCringeRating =
    api.tvShows.recalculateAverageCringeRating.useMutation();

  const handleDelete = () => {
    mutate({ review_id: review.review_id });
    updateAvgCringeRating.mutate(review.televisionShow.tvdb_id);
    (document.getElementById("delete-modal") as HTMLDialogElement).close();
    window.location.reload();
  };

  if (session.data?.id != review.user.id) {
    return null;
  }

  return (
    <div className="center-1 absolute top-1 flex flex-row gap-2">
      <Modal modalIdentifier="edit-modal" icon={<Edit />}>
        <h3 className="text-lg font-bold">Edit Review</h3>
        <ReviewForm
          selectedTvId={review.televisionShow.tvdb_id}
          existingReview={review}
        />
      </Modal>

      <Modal
        modalIdentifier="delete-modal"
        icon={<Trash className="cursor-pointer" size={20} />}
      >
        <form
          id="delete-modal-form"
          className="flex flex-col gap-3"
          onSubmit={handleDelete}
        >
          <h3 className="text-lg font-bold">Delete Review</h3>
          <p>Are you sure you want to delete this review?</p>
          <div className="flex flex-row justify-center">
            <button
              type="submit"
              className="-ms-px inline-flex items-center gap-x-2 rounded-lg border border-neutral-700 bg-red-500 px-4 py-3 text-sm font-medium text-white shadow-sm first:ms-0 hover:bg-secondary-purple-dark/70 focus:z-10 focus:bg-red-500/90 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              <Trash /> Delete Review
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
