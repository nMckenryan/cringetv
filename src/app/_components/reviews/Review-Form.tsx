"use client";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import RatingIcon from "../RatingIcon";

type Inputs = {
  tvId: string;
  reviewBio: string;
  cringeScore: number;
};

export default function ReviewForm({ tvId }: { tvId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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

          <div className="flex flex-row items-center justify-around">
            <button
              value={0.1}
              className="hover:bg-primary-purple/20 active:bg-primary-purple/40"
            >
              <RatingIcon reviewScore={0.1} />
            </button>
            <button
              value={1.0}
              className="hover:bg-primary-purple/20 active:bg-primary-purple/40"
            >
              <RatingIcon reviewScore={1.0} />
            </button>
            <button
              value={2.0}
              className="hover:bg-primary-purple/20 active:bg-primary-purple/40"
            >
              <RatingIcon reviewScore={2.0} />
            </button>
            <button
              value={4.0}
              className="hover:bg-primary-purple/20 active:bg-primary-purple/40"
            >
              <RatingIcon reviewScore={4.0} />
            </button>
            <button
              value={5.0}
              className="hover:bg-primary-purple/20 active:bg-primary-purple/40"
            >
              <RatingIcon reviewScore={5.0} />
            </button>

            <input type="submit" className="btn w-24 bg-secondary-purple" />
          </div>
          {errors.reviewBio && <span>This field is required</span>}
        </div>
      </form>
    </>
  );
}
