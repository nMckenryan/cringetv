"use client";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { AiFillSafetyCertificate } from "react-icons/ai";
import { IoIosWarning } from "react-icons/io";
import { MdDangerous } from "react-icons/md";
import { FaRadiation } from "react-icons/fa";
import { FaSkull } from "react-icons/fa";

type Inputs = {
  tvId: string;
  reviewBio: string;
  cringeScore: string;
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
          <div className="flex flex-row justify-around">
            <div className="flex flex-col gap-1">
              <AiFillSafetyCertificate size={50} style={{ color: "green" }} />
              <p>Safe</p>
            </div>{" "}
            <div className="flex flex-col gap-1">
              <IoIosWarning size={50} style={{ color: "yellow" }} />
              <p>Caution</p>
            </div>{" "}
            <div className="flex flex-col gap-1">
              <MdDangerous size={50} style={{ color: "orange" }} />
              <p>Unsafe</p>
            </div>{" "}
            <div className="flex flex-col gap-1">
              <FaRadiation size={50} style={{ color: "red" }} />
              <p>Cringe</p>
            </div>{" "}
            <div className="flex flex-col gap-1">
              <FaSkull size={50} style={{ color: "white" }} />
              <p>Deadly</p>
            </div>
          </div>

          <textarea
            className="textarea textarea-bordered"
            placeholder="Add a Review"
            {...register("reviewBio", { required: true })}
          ></textarea>

          {/* errors will return when field validation fails  */}
          {errors.reviewBio && <span>This field is required</span>}

          <input type="submit" className="btn w-24" />
        </div>
      </form>
    </>
  );
}
