"use client";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import RatingIcon from "../RatingIcon";

type Inputs = {
  tvId: string;
  reviewBio: string;
  cringeScore: number;
};

export default function ReviewForm({ tvdb_id }: { tvdb_id: string }) {
  const [reviewScore, setReviewScore] = React.useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col text-center">
          <textarea
            className="textarea textarea-bordered"
            placeholder="Add a Review"
            {...register("reviewBio", { required: true })}
          ></textarea>

          {/* errors will return when field validation fails  */}

          <div className="flex flex-row items-center justify-around py-2">
            <button
              onClick={() => setReviewScore(0.1)}
              className={`hover:bg-primary-purple/20 active:bg-primary-purple/40 rounded-xl ${reviewScore === 0.1 ? "bg-primary-blue-light" : ""}`}
            >
              <RatingIcon reviewScore={0.1} />
            </button>

            <button
              onClick={() => setReviewScore(1.0)}
              className={`hover:bg-primary-purple/20 active:bg-primary-purple/40 rounded-xl ${reviewScore === 1.0 ? "bg-primary-blue-light" : ""}`}
            >
              <RatingIcon reviewScore={1.0} />
            </button>

            <button
              className={`hover:bg-primary-purple/20 active:bg-primary-purple/40 rounded-xl ${reviewScore === 2.0 ? "bg-primary-blue-light" : ""}`}
            >
              <RatingIcon reviewScore={2.0} />
            </button>

            <button
              onClick={() => setReviewScore(4.0)}
              className={`hover:bg-primary-purple/20 active:bg-primary-purple/40 rounded-xl ${reviewScore === 4.0 ? "bg-primary-blue-light" : ""}`}
            >
              <RatingIcon reviewScore={4.0} />
            </button>

            <input
              type="submit"
              className="btn w-24 border-gray-800 bg-secondary-purple text-white/90 hover:bg-secondary-purple-light"
            />
          </div>
          {errors.reviewBio && <span>This field is required</span>}
        </div>
      </form>
    </>
  );
}
