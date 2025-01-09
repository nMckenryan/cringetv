import { Edit, Trash } from "lucide-react";
import { Modal } from "../Modal";
import ReviewForm from "./ReviewForm";

import { api } from "~/trpc/react";
import { type Review } from "~/types";

export default function ReviewActionsBar({ review }: { review: Review }) {
  const session = api.users.me.useQuery();
  //"cm5ololng0000dj30v58n7m1r";

  const { mutate } = api.reviews.deleteReview.useMutation();

  const updateAvgCringeRating =
    api.tvShows.recalculateAverageCringeRating.useMutation();

  if (session.data?.id !== review.userId) {
    return null;
  }

  return (
    <div className="absolute right-2 top-2 flex flex-row gap-2">
      <Modal modalIdentifier="edit-modal" icon={<Edit />}>
        <h3 className="text-lg font-bold">Edit Review</h3>
        <ReviewForm selectedTvId={review.tvdb_id} existingReview={review} />
      </Modal>

      <Modal
        modalIdentifier="delete-modal"
        icon={<Trash className="cursor-pointer" size={20} />}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate({ review_id: review.review_id });
            updateAvgCringeRating.mutate(review.tvdb_id);
          }}
        >
          <h3 className="text-lg font-bold">Delete Review</h3>
          <p>Are you sure you want to delete this review?</p>
          <div className="flex flex-row justify-center">
            <button
              type="submit"
              className="-ms-px inline-flex items-center gap-x-2 rounded-lg border border-neutral-700 bg-red-500 px-4 py-3 text-sm font-medium text-white shadow-sm first:ms-0 hover:bg-secondary-purple-dark/70 focus:z-10 focus:bg-red-500/90 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              <Trash />
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
