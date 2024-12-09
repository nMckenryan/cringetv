"use client";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import RatingIcon from "../RatingIcon";

import { api } from "~/trpc/react";
import { RatingCode } from "~/types";

type Inputs = {
  tvId: string;
  reviewBio: string;
};

export default function ReviewForm({ tvdb_id }: { tvdb_id: string }) {
  const [reviewScore, setReviewScore] = React.useState<number | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const utils = api.useUtils();

  const createReview = api.reviews.createNewReview.useMutation({
    onSuccess: async () => {
      await utils.reviews.invalidate();
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    createReview.mutate({
      tvdb_id: Number(tvdb_id),
      cringe_score_vote: Number(reviewScore),
      review_content: data.reviewBio,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col text-center">
        <textarea
          className="textarea textarea-bordered py-2"
          placeholder="Add a Review"
          {...register("reviewBio", { required: true })}
        />

        <div className="flex flex-row items-center justify-around py-2">
          <button
            onClick={() => setReviewScore(0)}
            className={`hover:bg-primary-purple/20 active:bg-primary-purple/40 rounded-xl ${reviewScore === 0 ? "bg-primary-blue-light" : ""}`}
          >
            <RatingIcon reviewScore={0} />
          </button>

          <button
            onClick={() => setReviewScore(RatingCode.BaseCautionLimit)}
            className={`hover:bg-primary-purple/20 active:bg-primary-purple/40 rounded-xl ${reviewScore === RatingCode.BaseCautionLimit ? "bg-primary-blue-light" : ""}`}
          >
            <RatingIcon reviewScore={RatingCode.BaseCautionLimit} />
          </button>

          <button
            onClick={() => setReviewScore(RatingCode.BaseUnsafeLimit)}
            className={`hover:bg-primary-purple/20 active:bg-primary-purple/40 rounded-xl ${reviewScore === RatingCode.BaseUnsafeLimit ? "bg-primary-blue-light" : ""}`}
          >
            <RatingIcon reviewScore={RatingCode.BaseUnsafeLimit} />
          </button>

          <button
            onClick={() => setReviewScore(RatingCode.BaseDangerLimit)}
            className={`hover:bg-primary-purple/20 active:bg-primary-purple/40 rounded-xl ${reviewScore === RatingCode.BaseDangerLimit ? "bg-primary-blue-light" : ""}`}
          >
            <RatingIcon reviewScore={RatingCode.BaseDangerLimit} />
          </button>

          <input
            type="submit"
            className="btn w-24 border-gray-800 bg-secondary-purple text-white/90 hover:bg-secondary-purple-light"
          />
        </div>
        {errors.reviewBio && <span>This field is required</span>}
      </div>
    </form>
  );
}
