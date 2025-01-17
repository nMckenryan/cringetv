"use client";
import RatingIcon from "../RatingIcon";

import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import { RatingCode, type Review } from "~/types";
import { Eraser, Send } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  reviewContent: z
    .string({
      invalid_type_error: "Invalid Review Content",
    })
    .min(1, { message: "Review Content is required" })
    .max(500, {
      message: "Review Content cannot be longer than 500 characters",
    }),
  reviewScore: z
    .number({
      invalid_type_error: "Invalid Review Score",
    })
    .min(0)
    .max(1),
});

type IFormInput = z.infer<typeof schema>;

export default function ReviewForm({
  selectedTvId,
  existingReview,
}: {
  selectedTvId: number;
  existingReview: Review | null;
}) {
  const {
    register,
    getValues,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      reviewContent: existingReview?.review_content ?? "",
      reviewScore: existingReview?.cringe_score_vote ?? -1,
    },
  });

  const updateReviewMutation = api.reviews.updateReview.useMutation();
  const createNewReviewMutation = api.reviews.createNewReview.useMutation();
  const updateAvgCringeRating =
    api.tvShows.recalculateAverageCringeRating.useMutation();

  const submitReview = async (data: IFormInput) => {
    if (existingReview != null) {
      if (
        data.reviewContent === existingReview.review_content &&
        data.reviewScore === existingReview.cringe_score_vote
      ) {
        return null;
      }
      updateReviewMutation.mutate({
        review_id: existingReview.review_id,
        review_content: data.reviewContent,
        cringe_score_vote: data.reviewScore,
      });
      updateAvgCringeRating.mutate(selectedTvId);
    } else {
      createNewReviewMutation.mutate({
        review_content: data.reviewContent,
        cringe_score_vote: data.reviewScore,
        tvdb_id: selectedTvId,
      });
      updateAvgCringeRating.mutate(selectedTvId);
    }
    window.location.reload();
  };

  return (
    <form
      className="flex flex-col text-center"
      onSubmit={handleSubmit((data) => submitReview(data))}
    >
      <textarea
        {...register("reviewContent", { required: true })}
        className="max-h-50 textarea resize-y bg-primary-blue-light text-white"
        placeholder="Write a Review"
      />

      <div className="mx-auto inline-flex rounded-lg py-2 shadow-sm">
        {/* TODO: set reset button to return to existing review when in edit mode */}
        <button
          type="reset"
          className="-ms-px inline-flex items-center gap-x-2 border border-neutral-700 bg-secondary-purple-dark px-4 py-3 text-sm font-medium text-white shadow-sm first:ms-0 first:rounded-s-lg last:rounded-e-lg hover:bg-secondary-purple-dark/70 focus:z-10 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          onClick={() => reset()}
        >
          <Eraser />
        </button>

        {[
          0,
          RatingCode.BaseCautionLimit,
          RatingCode.BaseUnsafeLimit,
          RatingCode.BaseDangerLimit,
        ].map((score) => (
          <button
            type="button"
            className={`-ms-px inline-flex items-center gap-x-2 border border-neutral-700 bg-primary-blue px-4 py-3 text-sm font-medium text-white shadow-sm first:ms-0 first:rounded-s-lg last:rounded-e-lg focus:z-10 ${getValues("reviewScore") === score ? "bg-secondary-purple" : ""} focus:outline-none disabled:pointer-events-none disabled:opacity-50`}
            key={score}
            onClick={() => {
              setValue("reviewScore", score, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
            }}
          >
            <RatingIcon reviewScore={score} />
          </button>
        ))}

        <button
          type="submit"
          className="-ms-px inline-flex items-center gap-x-2 border border-neutral-700 bg-secondary-purple-dark px-4 py-3 text-sm font-medium text-white shadow-sm first:ms-0 first:rounded-s-lg last:rounded-e-lg hover:bg-secondary-purple-dark/70 focus:z-10 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          <Send />
        </button>
      </div>
      {errors && (
        <p className="mx-auto flex-auto break-words text-left text-xs text-red-500">
          {errors.reviewContent && <span>Please enter a review</span>}
          <br />
          {errors.reviewScore && <span>Please select a score</span>}
        </p>
      )}
    </form>
  );
}
