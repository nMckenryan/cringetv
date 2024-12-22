"use client";
import React from "react";
import RatingIcon from "../RatingIcon";

import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import { RatingCode } from "~/types";
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

export default function ReviewForm({ selectedTvId }: { selectedTvId: number }) {
  const [reviewScore, setReviewScore] = React.useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      reviewContent: "",
      reviewScore: -1,
    },
  });

  const { mutate } = api.reviews.createNewReview.useMutation();

  return (
    <form
      className="flex w-full flex-col text-center md:w-[47vw]"
      onSubmit={handleSubmit((data) =>
        mutate({
          review_content: data.reviewContent,
          cringe_score_vote: data.reviewScore,
          tvdb_id: selectedTvId,
        }),
      )}
    >
      <input
        {...register("reviewContent", { required: true })}
        className="textarea textarea-bordered w-full bg-primary-blue-light pb-10 text-white"
        placeholder="Add a Review"
      />

      <div className="flex flex-row items-center justify-between py-2">
        <button
          type="reset"
          className="btn border-gray-800 bg-secondary-purple text-white/90 hover:bg-secondary-purple-light"
          onClick={() => setReviewScore(null)}
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
            name="review_score"
            key={score}
            onClick={() => setReviewScore(score)}
            className={`hover:bg-primary-purple/20 active:bg-primary-purple/40 rounded-xl ${reviewScore === score ? "bg-primary-blue-light" : ""}`}
          >
            <RatingIcon reviewScore={score} />
          </button>
        ))}

        <button
          type="submit"
          className="btn border-gray-800 bg-secondary-purple text-white/90 hover:bg-secondary-purple-light"
        >
          <Send />
        </button>
      </div>
      {errors && (
        <p className="flex-auto break-words text-left text-xs text-red-500">
          {errors.reviewContent && <span>Please enter a review</span>}
          {errors.reviewScore && <span>Please enter a score</span>}
        </p>
      )}
    </form>
  );
}
